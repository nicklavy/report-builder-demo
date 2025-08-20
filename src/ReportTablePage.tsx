import {
  MenuOutlined,
  ArrowLeftOutlined,
 FundTwoTone,
CarryOutTwoTone,
ContactsTwoTone,
SettingTwoTone,
AppstoreTwoTone,
ShopTwoTone,
IdcardTwoTone,
} from "@ant-design/icons";
import React, { useMemo, useRef, useState } from "react";
import {
  Button,
  Checkbox,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Modal,
  Select,
  Space,
  Tag,
  message,
  Layout,
  Avatar,
  Menu,
} from "antd";
import { UserOutlined } from "@ant-design/icons";
import dayjs, { Dayjs } from "dayjs";

// Pro Components (includes ProTable types/comp)
import {
  ProTable,
  type ProColumns,
  type ActionType,
  type ColumnsState,
} from "@ant-design/pro-components";

const { Header, Sider, Content } = Layout;

/* ----------------------- Header ----------------------- */
function AppHeader({
  collapsed,
  onToggle,
}: {
  collapsed: boolean;
  onToggle: () => void;
}) {
  return (
    <Header
      style={{
        background: "#fff", // force white header
        padding: "0 16px",
        borderBottom: "1px solid #f0f0f0",
      }}
      className="flex items-center justify-between"
    >
      {/* Global hamburger / close */}
      <button
        aria-label="Toggle menu"
        className="p-2 rounded hover:bg-gray-100"
        onClick={onToggle}
      >
        {collapsed ? <MenuOutlined /> : <ArrowLeftOutlined />}
      </button>

      {/* Placeholder logo */}
      <div className="text-lg font-bold"><img
          src="https://www.realtimereservation.com/wp-content/uploads/2025/08/RTW.svg"
          alt="Logo"
         width="150px"
         height="auto"
        /></div>

      {/* User icon */}
      <Avatar size="large" icon={<UserOutlined />} />
    </Header>
  );
}


/* ------------------- Types & Mock Data ------------------- */
type Row = {
  id: string;
  state: string;
  category: string;
  totalSales: number;
  orders: number;
  lastOrderDate: string; // ISO (YYYY-MM-DD)
};

type NumberRange = { min?: number; max?: number };
type DateRange = { start?: Dayjs; end?: Dayjs; noEnd?: boolean };

type FiltersState = {
  state?: string[];
  category?: string[];
  totalSales?: NumberRange;
  orders?: NumberRange;
  lastOrderDate?: DateRange;
};

type SorterState =
  | {
      field?: string;
      order?: "ascend" | "descend" | null;
    }
  | undefined;

const STATES = ["California", "Texas", "New York", "Florida", "Illinois", "Arizona"];
const CATEGORIES = ["Electronics", "Apparel", "Home", "Beauty", "Sports", "Grocery"];

const mockRows: Row[] = Array.from({ length: 120 }).map((_, i) => {
  const state = STATES[i % STATES.length];
  const category = CATEGORIES[i % CATEGORIES.length];
  const totalSales = Math.floor(10000 + Math.random() * 120000);
  const orders = Math.floor(30 + Math.random() * 900);
  const date = dayjs().subtract(Math.floor(Math.random() * 120), "day");
  return {
    id: String(i + 1),
    state,
    category,
    totalSales,
    orders,
    lastOrderDate: date.format("YYYY-MM-DD"),
  };
});

/* ----------------------- Helpers ----------------------- */
// AntD column filter API expects React.Key[]; pack objects to strings.
const packKey = (o: unknown): React.Key => JSON.stringify(o);
const unpackNumberRange = (k?: React.Key): NumberRange | undefined =>
  !k ? undefined : (JSON.parse(String(k)) as NumberRange);
const unpackDateRange = (k?: React.Key): DateRange | undefined => {
  if (!k) return undefined;
  const parsed = JSON.parse(String(k)) as { start: string | null; end: string | null; noEnd?: boolean };
  return {
    start: parsed.start ? dayjs(parsed.start) : undefined,
    end: parsed.end ? dayjs(parsed.end) : undefined,
    noEnd: !!parsed.noEnd,
  };
};

const numericInRange = (val: number, range?: NumberRange) => {
  if (!range) return true;
  if (range.min !== undefined && val < range.min) return false;
  if (range.max !== undefined && val > range.max) return false;
  return true;
};

const dateInRange = (d: Dayjs, range?: DateRange) => {
  if (!range || (!range.start && !range.end)) return true;
  if (range.start && d.isBefore(range.start, "day")) return false;
  if (!range.noEnd && range.end && d.isAfter(range.end, "day")) return false;
  return true;
};

/* ------------- Report Builder (advanced table) ------------- */
function ReportBuilderTable() {
  const actionRef = useRef<ActionType | null>(null);

  // Controlled filters / sorter / columnsState
  const [filters, setFilters] = useState<FiltersState>({});
  const [columnsStateMap, setColumnsStateMap] = useState<Record<string, ColumnsState>>({});
  const [sorter, setSorter] = useState<SorterState>();
  const [tableKey, setTableKey] = useState(0);

  // Dynamic list demo (async)
  const [categoryOptions, setCategoryOptions] = useState<{ label: string; value: string }[]>([]);
  const loadCategories = async () => {
    await new Promise((r) => setTimeout(r, 250));
    setCategoryOptions(CATEGORIES.map((c) => ({ label: c, value: c })));
  };

  const columns = useMemo<ProColumns<Row>[]>(() => {
    const cols: ProColumns<Row>[] = [
      {
        title: "State",
        dataIndex: "state",
        key: "state",
        fixed: "left",
        width: 160,
        filters: STATES.map((s) => ({ text: s, value: s })),
        filterSearch: true,
        filteredValue: (filters.state as React.Key[] | undefined) ?? null,
        onFilter: () => true,
        sorter: (a, b) => a.state.localeCompare(b.state),
      },
      {
        title: "Category",
        dataIndex: "category",
        key: "category",
        width: 180,
        sorter: (a, b) => a.category.localeCompare(b.category),
        filteredValue: (filters.category as React.Key[] | undefined) ?? null,
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => {
          const current = (selectedKeys as React.Key[] as string[]) ?? (filters.category ?? []);
          return (
            <div className="p-3 w-64">
              <Space direction="vertical" className="w-full">
                <Select
                  showSearch
                  mode="multiple"
                  allowClear
                  placeholder="Select categories"
                  options={categoryOptions}
                  onDropdownVisibleChange={(open) => {
                    if (open && categoryOptions.length === 0) loadCategories();
                  }}
                  value={current}
                  onChange={(vals) => setSelectedKeys(vals as unknown as React.Key[])}
                  style={{ width: "100%" }}
                />
                <Space className="justify-end w-full">
                  <Button
                    onClick={() => {
                      clearFilters?.();
                      setFilters((f) => ({ ...f, category: undefined }));
                      confirm();
                    }}
                  >
                    Reset
                  </Button>
                  <Button
                    type="primary"
                    onClick={() => {
                      const arr = (current || []) as string[];
                      setFilters((f) => ({ ...f, category: arr.length ? arr : undefined }));
                      confirm();
                    }}
                  >
                    Apply
                  </Button>
                </Space>
              </Space>
            </div>
          );
        },
        onFilter: () => true,
      },
      {
        title: "Total Sales",
        dataIndex: "totalSales",
        key: "totalSales",
        width: 160,
        valueType: "money",
        sorter: (a, b) => a.totalSales - b.totalSales,
        filteredValue: filters.totalSales ? [packKey(filters.totalSales)] : null,
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => {
          const current = unpackNumberRange(selectedKeys?.[0]) ?? filters.totalSales ?? {};
          return (
            <div className="p-3 w-64">
              <Space direction="vertical" className="w-full">
                <InputNumber
                  placeholder="Min"
                  className="w-full"
                  value={current.min}
                  onChange={(val) => {
                    const next = { ...current, min: val ?? undefined };
                    setSelectedKeys([packKey(next)]);
                  }}
                />
                <InputNumber
                  placeholder="Max"
                  className="w-full"
                  value={current.max}
                  onChange={(val) => {
                    const next = { ...current, max: val ?? undefined };
                    setSelectedKeys([packKey(next)]);
                  }}
                />
                <Space className="justify-end w-full">
                  <Button
                    onClick={() => {
                      clearFilters?.();
                      setFilters((f) => ({ ...f, totalSales: undefined }));
                      confirm();
                    }}
                  >
                    Reset
                  </Button>
                  <Button
                    type="primary"
                    onClick={() => {
                      const clean: NumberRange = {};
                      if (current.min !== undefined) clean.min = current.min;
                      if (current.max !== undefined) clean.max = current.max;
                      setFilters((f) => ({
                        ...f,
                        totalSales: Object.keys(clean).length ? clean : undefined,
                      }));
                      confirm();
                    }}
                  >
                    Apply
                  </Button>
                </Space>
              </Space>
            </div>
          );
        },
        onFilter: () => true,
      },
      {
        title: "Orders",
        dataIndex: "orders",
        key: "orders",
        width: 140,
        sorter: (a, b) => a.orders - b.orders,
        filteredValue: filters.orders ? [packKey(filters.orders)] : null,
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => {
          const current = unpackNumberRange(selectedKeys?.[0]) ?? filters.orders ?? {};
          return (
            <div className="p-3 w-64">
              <Space direction="vertical" className="w-full">
                <InputNumber
                  placeholder="Min"
                  className="w-full"
                  value={current.min}
                  onChange={(val) => {
                    const next = { ...current, min: val ?? undefined };
                    setSelectedKeys([packKey(next)]);
                  }}
                />
                <InputNumber
                  placeholder="Max"
                  className="w-full"
                  value={current.max}
                  onChange={(val) => {
                    const next = { ...current, max: val ?? undefined };
                    setSelectedKeys([packKey(next)]);
                  }}
                />
                <Space className="justify-end w-full">
                  <Button
                    onClick={() => {
                      clearFilters?.();
                      setFilters((f) => ({ ...f, orders: undefined }));
                      confirm();
                    }}
                  >
                    Reset
                  </Button>
                  <Button
                    type="primary"
                    onClick={() => {
                      const clean: NumberRange = {};
                      if (current.min !== undefined) clean.min = current.min;
                      if (current.max !== undefined) clean.max = current.max;
                      setFilters((f) => ({
                        ...f,
                        orders: Object.keys(clean).length ? clean : undefined,
                      }));
                      confirm();
                    }}
                  >
                    Apply
                  </Button>
                </Space>
              </Space>
            </div>
          );
        },
        onFilter: () => true,
      },
      {
        title: "Last Order Date",
        dataIndex: "lastOrderDate",
        key: "lastOrderDate",
        width: 200,
        sorter: (a, b) => dayjs(a.lastOrderDate).valueOf() - dayjs(b.lastOrderDate).valueOf(),
        filteredValue: filters.lastOrderDate
          ? [
              packKey({
                start: filters.lastOrderDate.start?.toISOString?.() ?? null,
                end: filters.lastOrderDate.noEnd
                  ? null
                  : filters.lastOrderDate.end?.toISOString?.() ?? null,
                noEnd: !!filters.lastOrderDate.noEnd,
              }),
            ]
          : null,
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => {
          const current = unpackDateRange(selectedKeys?.[0]) ?? filters.lastOrderDate ?? {
            start: undefined,
            end: undefined,
            noEnd: false,
          };
          return (
            <div className="p-3 w-72">
              <Space direction="vertical" className="w-full">
                <DatePicker.RangePicker
                  className="w-full"
                  value={[
                    current.start ? dayjs(current.start) : null,
                    current.noEnd ? null : current.end ? dayjs(current.end) : null,
                  ]}
                  onChange={(vals) => {
                    const [s, e] = vals || [];
                    const next = { ...current, start: s ?? undefined, end: e ?? undefined };
                    setSelectedKeys([
                      packKey({
                        start: next.start?.toISOString?.() ?? null,
                        end: next.noEnd ? null : next.end?.toISOString?.() ?? null,
                        noEnd: !!next.noEnd,
                      }),
                    ]);
                  }}
                  allowEmpty={[false, true]}
                  placeholder={["Start date", "End date"]}
                />
                <Checkbox
                  checked={!!current.noEnd}
                  onChange={(e) => {
                    const next = { ...current, noEnd: e.target.checked };
                    setSelectedKeys([
                      packKey({
                        start: next.start?.toISOString?.() ?? null,
                        end: next.noEnd ? null : next.end?.toISOString?.() ?? null,
                        noEnd: !!next.noEnd,
                      }),
                    ]);
                  }}
                >
                  No end date
                </Checkbox>
                <Space className="justify-end w-full">
                  <Button
                    onClick={() => {
                      clearFilters?.();
                      setFilters((f) => ({ ...f, lastOrderDate: undefined }));
                      confirm();
                    }}
                  >
                    Reset
                  </Button>
                  <Button
                    type="primary"
                    onClick={() => {
                      const payload: DateRange | undefined =
                        current.start || current.end || current.noEnd ? current : undefined;
                      setFilters((f) => ({ ...f, lastOrderDate: payload }));
                      confirm();
                    }}
                  >
                    Apply
                  </Button>
                </Space>
              </Space>
            </div>
          );
        },
        onFilter: () => true,
      },
    ];
    return cols;
  }, [filters, categoryOptions]);

  const filteredData: Row[] = useMemo(() => {
    return mockRows.filter((r) => {
      if (filters.state && filters.state.length > 0 && !filters.state.includes(r.state)) return false;
      if (filters.category && filters.category.length > 0 && !filters.category.includes(r.category)) return false;
      if (!numericInRange(r.totalSales, filters.totalSales)) return false;
      if (!numericInRange(r.orders, filters.orders)) return false;
      if (!dateInRange(dayjs(r.lastOrderDate, "YYYY-MM-DD"), filters.lastOrderDate)) return false;
      return true;
    });
  }, [filters]);

  const handleTableChange = (_p: any, _f: any, sorterParam: any) => {
    const s: SorterState = sorterParam?.order
      ? { field: sorterParam.field as string, order: sorterParam.order }
      : undefined;
    setSorter(s);
  };

  const clearAll = () => {
    setFilters({});
    setSorter(undefined);
    setTableKey((k) => k + 1);
  };
  const removeFilter = (key: keyof FiltersState) => {
    setFilters((f) => ({ ...f, [key]: undefined }));
  };

  const [saveOpen, setSaveOpen] = useState<null | "save" | "saveAsNew">(null);
  const [form] = Form.useForm();

  const buildReportDefinition = (meta: { name: string; group: string; description?: string; mode: "save" | "saveAsNew" }) => {
    const def = {
      meta,
      dataSourceId: "sales-demo",
      createdAt: new Date().toISOString(),
      columnsStateMap,
      sorter,
      filters: {
        state: filters.state ?? null,
        category: filters.category ?? null,
        totalSales: filters.totalSales ?? null,
        orders: filters.orders ?? null,
        lastOrderDate: filters.lastOrderDate
          ? {
              start: filters.lastOrderDate.start?.format("YYYY-MM-DD") ?? null,
              end: filters.lastOrderDate.noEnd ? null : filters.lastOrderDate.end?.format("YYYY-MM-DD") ?? null,
              noEnd: !!filters.lastOrderDate.noEnd,
            }
          : null,
      },
    };
    return def;
  };

  const onSave = async () => {
    try {
      const values = await form.validateFields();
      const payload = buildReportDefinition({
        ...values,
        mode: saveOpen === "save" ? "save" : "saveAsNew",
      });
      console.log("Report payload:", payload);
      message.success(saveOpen === "save" ? "Report saved." : "Saved as new report.");
      setSaveOpen(null);
      form.resetFields();
    } catch {
      /* handled by antd */
    }
  };

  const activeChips: Array<{ key: keyof FiltersState; label: string; value: string }> = [];
  if (filters.state?.length) activeChips.push({ key: "state", label: "State", value: filters.state.join(", ") });
  if (filters.category?.length) activeChips.push({ key: "category", label: "Category", value: filters.category.join(", ") });
  if (filters.totalSales && (filters.totalSales.min !== undefined || filters.totalSales.max !== undefined)) {
    activeChips.push({ key: "totalSales", label: "Total Sales", value: `${filters.totalSales.min ?? "–"} to ${filters.totalSales.max ?? "–"}` });
  }
  if (filters.orders && (filters.orders.min !== undefined || filters.orders.max !== undefined)) {
    activeChips.push({ key: "orders", label: "Orders", value: `${filters.orders.min ?? "–"} to ${filters.orders.max ?? "–"}` });
  }
  if (filters.lastOrderDate && (filters.lastOrderDate.start || filters.lastOrderDate.end || filters.lastOrderDate.noEnd)) {
    const s = filters.lastOrderDate.start?.format("YYYY-MM-DD") ?? "—";
    const e = filters.lastOrderDate.noEnd ? "No end" : filters.lastOrderDate.end?.format("YYYY-MM-DD") ?? "—";
    activeChips.push({ key: "lastOrderDate", label: "Last Order Date", value: `${s} → ${e}` });
  }

  return (
    <div className="p-6">
      {/* Header row inside content */}
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Sales Report — ProTable Demo</h1>
        <div className="flex gap-2">
          <Button onClick={clearAll}>Clear All</Button>
          <Button onClick={() => setSaveOpen("save")}>Save</Button>
          <Button type="primary" onClick={() => setSaveOpen("saveAsNew")}>Save As New</Button>
        </div>
      </div>

      {/* Filter Summary */}
      <div className="mb-4 rounded-lg border border-gray-200 bg-gray-50 p-3">
        <div className="mb-2 text-sm font-medium">Filter Summary</div>
        {activeChips.length === 0 ? (
          <div className="text-sm text-gray-500">No active filters.</div>
        ) : (
          <Space wrap>
            {activeChips.map((chip) => (
              <Tag
                key={chip.key}
                closable
                onClose={(e) => {
                  e.preventDefault();
                  removeFilter(chip.key);
                }}
              >
                <span className="font-medium">{chip.label}:</span>&nbsp;{chip.value}
              </Tag>
            ))}
          </Space>
        )}
      </div>

      {/* Table */}
      <ProTable<Row>
  key={tableKey}
  actionRef={actionRef as any}
  rowKey="id"
  search={false}
  columns={columns}
  dataSource={filteredData}
  onChange={handleTableChange}
  columnsState={{
    persistenceKey: "report-columns-v2",
    persistenceType: "localStorage",
    onChange: (map) => setColumnsStateMap(map),
  }}
  scroll={{ x: 1100 }}
  sticky
  pagination={{ pageSize: 10, showSizeChanger: true }}
  options={{
    density: true,
    fullScreen: true,
    setting: { listsHeight: 400 }, // 👈 gear icon (column settings)
  }}
/>

      {/* Save / Save As New */}
      <Modal
        title={saveOpen === "save" ? "Save Report" : "Save As New Report"}
        open={!!saveOpen}
        onOk={onSave}
        onCancel={() => {
          setSaveOpen(null);
          form.resetFields();
        }}
        okText={saveOpen === "save" ? "Save" : "Save As New"}
      >
        <Form form={form} layout="vertical">
          <Form.Item name="name" label="Report Name" rules={[{ required: true }]}>
            <Input placeholder="e.g., Sales by State (Q1)" />
          </Form.Item>
          <Form.Item name="group" label="Group / Category" rules={[{ required: true }]}>
            <Select
              placeholder="Select a group"
              options={[
                { label: "Sales", value: "Sales" },
                { label: "Finance", value: "Finance" },
                { label: "Operations", value: "Operations" },
              ]}
            />
          </Form.Item>
          <Form.Item name="description" label="Description">
            <Input.TextArea rows={3} placeholder="Optional description for this report…" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

/* --------------------- Page Layout Wrapper --------------------- */
export default function ReportTablePage() {
  const [collapsed, setCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  return (
    <Layout style={{ minHeight: "100vh" }}>
      {/* Global header with hamburger/X */}
      <AppHeader
        collapsed={collapsed}
        onToggle={() => setCollapsed((c) => !c)}
      />

      {/* Everything below header */}
      <Layout>
<Sider
  width={240}
  collapsedWidth={0}
  collapsible
  collapsed={collapsed}
  trigger={null}
  breakpoint="lg"
  onBreakpoint={(broken) => {
    setIsMobile(broken);
    if (broken) setCollapsed(true);
    else setCollapsed(false);
  }}
  style={{
    background: "#fff",
    borderRight: "1px solid #f0f0f0",
    transition: "all 0.2s ease",
    padding: 0, // avoid default inner padding that can add space
  }}
>
  <div className="flex h-full flex-col">
    {/* Top: nav menu takes the available space */}
    <Menu
      mode="inline"
      theme="light"
      defaultSelectedKeys={["reporting:reports"]}
      items={[
        {
          key: "bookingconsole",
          icon: <CarryOutTwoTone twoToneColor="#b37feb" />,
          label: "Booking Console",
          children: [
            { key: "console:calendar", label: "Overview" },
            { key: "console:appointments", label: "Appointments" },
            { key: "console:orders", label: "Orders" },
            { key: "console:dashboard", label: "Dashboard" },
            
          ],
        },
        {
          key: "customers",
          icon: <ContactsTwoTone twoToneColor="#b37feb" />,
          label: "Customers",
          children: [
            { key: "customers:directory", label: "Client Directory" },
            { key: "customers:communications", label: "Communications" },
          ],
        },
        {
          key: "staff",
          icon: <IdcardTwoTone twoToneColor="#b37feb" />,
          label: "Staff",
          children: [
            { key: "staff:directory", label: "Staff Directory" },
            { key: "staff:timecard", label: "timecard" },
          ],
        },
        {
          key: "reporting",
          icon: <FundTwoTone twoToneColor="#b37feb" />,
          label: "Reporting",
          children: [
            { key: "reporting:reports", label: "Reports" },
            { key: "reporting:datasources", label: "Data Sources" },
          ],
        },
        {
          key: "resources",
          icon: <AppstoreTwoTone twoToneColor="#b37feb" />,
          label: "Resources",
          children: [
            { key: "resources:rooms", label: "Rooms" },
            { key: "resources:equipment", label: "Equipment" },
            { key: "resources:services", label: "Services" },
          ],
        },
        {
          key: "retail",
          icon: <ShopTwoTone twoToneColor="#b37feb" />,
          label: "Retail",
          children: [
            { key: "retail:products", label: "Products" },
            { key: "retail:inventory", label: "Inventory" },
          ],
        },
        {
          key: "settings",
          icon: <SettingTwoTone twoToneColor="#b37feb" />,
          label: "Settings",
          children: [
            { key: "settings:schedule", label: "Schedule" },
            { key: "settings:theme", label: "Theme" },
            { key: "settings:calendar", label: "Calendar" },
            { key: "settings:tags", label: "Tags" },
          ],
        },
      ]}
      style={{ borderRight: 0, background: "#fff" }}
      className="flex-1 overflow-auto"
    />

    {/* Bottom: footer pinned */}
    {!collapsed && (
      <div className="mt-auto p-4 text-xs">
        <div>© 2024 Company Name</div>
        <div>
          <a href="#">Terms of Use</a> | <a href="#">Privacy</a>
        </div>
        <div>
          <a href="#">Cookies</a> | <a href="#">Help</a>
        </div>
        <div className="flex mt-4"><div className="flex-1"><img src="https://www.realtimereservation.com/wp-content/uploads/2025/08/poweredbyRTR.svg" width="100px"/></div>
        <div className="flex-2 absolute bottom-4 right-4 text-xs">v2024.02</div>
      </div></div>
    )}
  </div>
</Sider>

        

        <Content className="p-6 bg-gray-50">
          <ReportBuilderTable />
        </Content>
      </Layout>
    </Layout>
  );
}


