
import {
  MenuOutlined,
  ArrowLeftOutlined,
  EnvironmentOutlined,
  PhoneOutlined,
  GlobalOutlined,
  MailOutlined,
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
  Dropdown,
  Card,
  Divider,
  List,
  Typography,
  Tooltip,
} from "antd";
import dayjs, { Dayjs } from "dayjs";
import { Table } from "antd";


// Pro Components (includes ProTable types/comp)
import {
  ProTable,
  type ProColumns,
  type ActionType,
  type ColumnsState,
} from "@ant-design/pro-components";

const { Sider, Content } = Layout;


type AppHeaderProps = {
  collapsed: boolean;
  onToggle: () => void;
  onSwitchModule?: (key: string) => void;
};


const bookingURL   = "https://www.realtimereservation.com/wp-content/uploads/2025/08/calendar.png";
const staffURL     = "https://www.realtimereservation.com/wp-content/uploads/2025/08/staff.png";
const clientsURL   = "https://www.realtimereservation.com/wp-content/uploads/2025/08/clients.png";
const reportingURL = "https://www.realtimereservation.com/wp-content/uploads/2025/08/reporting.png";
const settingsURL  = "https://www.realtimereservation.com/wp-content/uploads/2025/08/settings.png";
const resourcesURL = "https://www.realtimereservation.com/wp-content/uploads/2025/08/resources.png";
const retailURL    = "https://www.realtimereservation.com/wp-content/uploads/2025/08/retail.png";


/* ----------------------- Header ----------------------- */
function AppHeader({ collapsed, onToggle, onSwitchModule }: AppHeaderProps) {
  const { Text } = Typography;
    const modules = [
    { key: "control",   title: "Control Center",  desc: "Admin settings and dashboard",    icon: "https://www.realtimereservation.com/wp-content/uploads/2025/08/speedometer.gif" },
    { key: "pool",      title: "Pool & Beach",    desc: "Settings, controls and dashboard", icon: "https://www.realtimereservation.com/wp-content/uploads/2025/07/sun-umbrella-1.gif" },
    { key: "activities",title: "Activities",      desc: "Settings, controls and dashboard", icon: "https://www.realtimereservation.com/wp-content/uploads/2025/07/canoe.gif" },
    { key: "compendium",title: "Digital Compendium", desc:"Settings, controls and dashboard", icon: "https://www.realtimereservation.com/wp-content/uploads/2025/07/ebook.gif" },
    { key: "fnb",       title: "Food & Beverage", desc: "Settings, controls and dashboard", icon: "https://www.realtimereservation.com/wp-content/uploads/2025/07/dinner-1.gif" },
    { key: "restaurant",title: "Restaurant",      desc: "Settings, controls and dashboard", icon: "https://www.realtimereservation.com/wp-content/uploads/2025/07/restaurant.gif" },
    { key: "spa",       title: "Spa & Wellness",  desc: "Settings, controls and dashboard", icon: "https://www.realtimereservation.com/wp-content/uploads/2025/08/face-massage.gif" },
  ];
const currentUser = {
  name: "Willie Nelson",
  email: "willienelson@email.com",
  avatar: "https://i.pinimg.com/280x280_RS/5e/ce/4d/5ece4dd6dd24e45f800fadf9e1daf080.jpg", // 👈 your image URL
};
  const overlay = (
    <Card
      style={{ width: 340, borderRadius: 12 }}
      bodyStyle={{ padding: 16 }}
      onClick={(e) => e.stopPropagation()} // keep dropdown open when clicking inside
    >
      {/* Profile */}
     
     
      <div className="flex items-center gap-3">
       <Avatar src={currentUser.avatar} size={48} />
        <div className="min-w-0">
          <div className="font-semibold text-[16px] leading-5">{currentUser.name}</div>
          <div className="text-gray-500 text-[12px]">Admin Level 2</div>
          <div className="text-gray-600 text-[12px] flex items-center gap-1">
            <MailOutlined /> {currentUser.email}
          </div>
        </div>
      </div>

      <Divider style={{ margin: "12px 0" }} />

      {/* Module list */}
      <List
        itemLayout="horizontal"
        dataSource={modules}
        split={false}
        renderItem={(m, idx) => (
          <List.Item
            key={m.key}
            style={{
              padding: "8px 8px",
              borderRadius: 8,
              background: idx === 0 ? "#fafafa" : undefined, // subtle highlight like your mock
              cursor: "pointer",
            }}
            onClick={() => {
              onSwitchModule?.(m.key);
              message.success(`Switched to ${m.title}`);
            }}
          >
            <Space align="start">
              <img
                src={m.icon}
                alt=""
                width={28}
                height={28}
                style={{ borderRadius: 6, objectFit: "cover" }}
              />
              <div>
                <div className="font-medium leading-5">{m.title}</div>
                <Text type="secondary" style={{ fontSize: 12 }}>
                  {m.desc}
                </Text>
              </div>
            </Space>
          </List.Item>
        )}
      />

      <Button
        block
        size="large"
        type="primary"
        style={{ marginTop: 12, borderRadius: 8 }}
        onClick={() => message.info("Logged out")}
      >
        Log Out
      </Button>
    </Card>
  );

  return (
    <header className="grid grid-cols-3 items-center px-4 py-2 bg-white border-b border-gray-200">
      {/* Left: hamburger/back */}
      <div className="flex items-center">
        <Tooltip title={collapsed ? "Open menu" : "Close menu"} mouseEnterDelay={0.2}>
          <button
            type="button"
            onClick={onToggle}
            aria-label={collapsed ? "Open menu" : "Close menu"}
            className="inline-flex h-9 w-9 items-center justify-center rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[var(--ant-color-primary)]"
          >
            {collapsed ? (
              <MenuOutlined style={{ fontSize: 18 }} />
            ) : (
              <ArrowLeftOutlined style={{ fontSize: 18 }} />
            )}
          </button>
        </Tooltip>
      </div>

      {/* Center: logo (stays centered regardless of left/right) */}
      <div className="justify-self-center">
        <img src="https://www.realtimereservation.com/wp-content/uploads/2025/08/RTW.svg" className="h-5" alt="Logo" />
      </div>

      {/* Right: user dropdown */}
      <div className="justify-self-end">
        <Dropdown trigger={["click"]} placement="bottomRight" dropdownRender={() => overlay}>
          <div className="cursor-pointer">
            <Avatar size="default" src={currentUser.avatar} />
          </div>
        </Dropdown>
      </div>
    </header>
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

type AggOp = "none" | "sum" | "avg" | "min" | "max" | "count";
type Aggregations = Record<string, AggOp>;   // columnKey -> op
type GroupBy = string[];                     // ordered list (we’ll respect this order)

const NUMERIC_COLS = ["totalSales", "orders"];          // numeric-only
const GROUPABLE_COLS = ["state", "category"];           // text/date etc. you allow grouping on

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

type GroupRow = Row & {
  __group?: boolean;
  __groupKey?: string;  // concatenated key of group values
  children?: Row[];
};



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

const aggregateRows = (rows: Row[], aggs: Aggregations) => {
  const base: Partial<Row> = {};
  NUMERIC_COLS.forEach((key) => {
    const op = aggs[key];
    if (!op || op === "none") return;

    const values = rows.map((r) => r[key as keyof Row] as number);

    switch (op) {
      case "sum":
        base[key as keyof Row] = values.reduce((a, b) => a + b, 0) as any;
        break;
      case "avg":
        base[key as keyof Row] = (values.reduce((a, b) => a + b, 0) / Math.max(1, values.length)) as any;
        break;
      case "min":
        base[key as keyof Row] = Math.min(...values) as any;
        break;
      case "max":
        base[key as keyof Row] = Math.max(...values) as any;
        break;
      case "count":
        base[key as keyof Row] = values.length as any;
        break;
    }
  });
  return base;
};


/* ------------- Report Builder (advanced table) ------------- */
function ReportBuilderTable() {
  const actionRef = useRef<ActionType | null>(null);

  // Aggregation & Grouping state (must be before columns useMemo)
  const [aggOpen, setAggOpen] = useState(false);
  const [groupOpen, setGroupOpen] = useState(false);
  const [aggs, setAggs] = useState<Aggregations>({});
  const [groupBy, setGroupBy] = useState<GroupBy>([]);

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

  // Build grouped data (depends on filters, groupBy, and aggs)
  const groupedData: GroupRow[] = useMemo(() => {
    if (groupBy.length === 0) return filteredData as GroupRow[];

    const by = groupBy;
    const map = new Map<string, Row[]>();

    filteredData.forEach((r) => {
      const key = by.map((k) => (r as any)[k]).join("||");
      const list = map.get(key);
      if (list) list.push(r);
      else map.set(key, [r]);
    });

    const result: GroupRow[] = [];
    map.forEach((rows, key) => {
      const agg = aggregateRows(rows, aggs);
      result.push({
        id: `group-${key}`,
        state: rows[0].state,
        category: rows[0].category,
        totalSales: (agg.totalSales as number) ?? 0,
        orders: (agg.orders as number) ?? 0,
        lastOrderDate: rows[0].lastOrderDate,
        __group: true,
        __groupKey: key,
        children: rows,
      });
    });

    result.sort((a, b) => (String(a.__groupKey) > String(b.__groupKey) ? 1 : -1));
    return result;
  }, [filteredData, groupBy, aggs]);

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
        render: (_, record: any) => {
    if (record.__group) {
      // pretty group label using chosen groupBy columns
      const parts = record.__groupKey.split("||");
      const label = groupBy.map((k, i) => `${k}: ${parts[i]}`).join(" · ");
      return <span className="font-semibold">{label}</span>;
    }
    return record.state;
  },
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
            <div
              className="w-64 p-3"
              onKeyDown={(e) => e.stopPropagation()}
              onMouseDown={(e) => e.stopPropagation()}
              onClick={(e) => e.stopPropagation()}
              style={{ display: "flex", flexDirection: "column", maxHeight: 360 }}
            >
              {/* Scrollable content area */}
              <div style={{ flex: 1, overflow: "auto" }}>
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
 getDropdownContainer={(triggerNode) =>
  (triggerNode.closest('.ant-table-filter-dropdown') as HTMLElement) ||
  (triggerNode.parentElement as HTMLElement)
}                   maxTagCount="responsive"
                    virtual={false}
                    placement="topRight"
                  />
                </Space>
              </div>

              {/* Sticky footer with actions */}
              <div className="pt-2 mt-2 border-t border-gray-200 bg-white" style={{ position: "sticky", bottom: 0 }}>
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
                      const sel = (selectedKeys as React.Key[] | undefined) ?? [];
                      const arr = sel.map((k) => String(k));
                      setFilters((f) => ({ ...f, category: arr.length ? arr : undefined }));
                      confirm();
                    }}
                  >
                    Apply
                  </Button>
                </Space>
              </div>
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
            <div className="p-3 w-64" onKeyDown={(e) => e.stopPropagation()}>
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
            <div className="p-3 w-64" onKeyDown={(e) => e.stopPropagation()}>
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
            <div className="p-3 w-72" onKeyDown={(e) => e.stopPropagation()}>
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
                  getPopupContainer={(triggerNode) => triggerNode.parentElement as HTMLElement}
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
  }, [filters, categoryOptions, groupBy]);

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

  // ---------------- Chips (Filters, Grouping, Aggregations) ----------------
  type Chip = {
    kind: "filter" | "group" | "agg";
    key: string;              // filter field OR group/agg column key
    label: string;            // e.g., "State", "Grouping", "Aggregations"
    value: string;            // human text
  };

  const chips: Chip[] = [];

  // Filter chips
  if (filters.state?.length) chips.push({ kind: "filter", key: "state", label: "State", value: filters.state.join(", ") });
  if (filters.category?.length) chips.push({ kind: "filter", key: "category", label: "Category", value: filters.category.join(", ") });
  if (filters.totalSales && (filters.totalSales.min !== undefined || filters.totalSales.max !== undefined)) {
    chips.push({
      kind: "filter",
      key: "totalSales",
      label: "Total Sales",
      value: `${filters.totalSales.min ?? "–"} to ${filters.totalSales.max ?? "–"}`,
    });
  }
  if (filters.orders && (filters.orders.min !== undefined || filters.orders.max !== undefined)) {
    chips.push({
      kind: "filter",
      key: "orders",
      label: "Orders",
      value: `${filters.orders.min ?? "–"} to ${filters.orders.max ?? "–"}`,
    });
  }
  if (filters.lastOrderDate && (filters.lastOrderDate.start || filters.lastOrderDate.end || filters.lastOrderDate.noEnd)) {
    const s = filters.lastOrderDate.start?.format("YYYY-MM-DD") ?? "—";
    const e = filters.lastOrderDate.noEnd ? "No end" : filters.lastOrderDate.end?.format("YYYY-MM-DD") ?? "—";
    chips.push({ kind: "filter", key: "lastOrderDate", label: "Last Order Date", value: `${s} → ${e}` });
  }

  // Grouping chips (one per selected group column)
  groupBy.forEach((g) => {
    chips.push({ kind: "group", key: g, label: "Grouping", value: g });
  });

  // Aggregation chips (one per numeric col with an op)
  Object.entries(aggs)
    .filter(([, op]) => op && op !== "none")
    .forEach(([col, op]) => {
      chips.push({ kind: "agg", key: col, label: "Aggregations", value: `${col}=${op}` });
    });

  return (
    <div className="p-6">
      {/* Header row inside content */}
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Sales Report — ProTable Demo</h1>
        {/* Header row inside content */}

  
        <div className="flex gap-2">

          <Button onClick={clearAll}>Clear All</Button>
          <Button onClick={() => setSaveOpen("save")}>Save</Button>
          <Button type="primary" onClick={() => setSaveOpen("saveAsNew")}>Save As New</Button>
        </div>
      </div>

      {/* Filters & Settings (chips with X to remove) */}
      <div className="mb-4 rounded-lg border border-gray-200 bg-gray-50 p-3">
        <div className="mb-2 text-sm font-medium">Filters & Settings</div>

        {chips.length > 0 ? (
          <Space wrap>
            {chips.map((chip, idx) => (
              <Tag
                key={`${chip.kind}-${chip.key}-${idx}`}
                closable
                onClose={(e) => {
                  e.preventDefault();
                  if (chip.kind === "filter") {
                    // remove just this filter
                    removeFilter(chip.key as keyof FiltersState);
                  } else if (chip.kind === "group") {
                    // remove this group column
                    setGroupBy((prev) => prev.filter((k) => k !== chip.key));
                  } else if (chip.kind === "agg") {
                    // clear this aggregation op
                    setAggs((prev) => ({ ...prev, [chip.key]: "none" }));
                  }
                }}
              >
                <span className="font-medium">{chip.label}:</span>&nbsp;{chip.value}
              </Tag>
            ))}
          </Space>
        ) : (
          <div className="text-sm text-gray-500">No active settings or filters.</div>
        )}
      </div>

      {/* Table */}
   <ProTable<GroupRow>
  key={tableKey}
  actionRef={actionRef as any}
  rowKey="id"
  search={false}
  headerTitle={
    // LEFT side of the toolbar
    <Space>
      <Button onClick={() => setAggOpen(true)}>Aggregate</Button>
      <Button onClick={() => setGroupOpen(true)}>Grouping</Button>
    </Space>
  }

  options={{
    density: true,
    fullScreen: true,
    setting: { listsHeight: 400 }, // gear icon (column settings)
  }}
  columns={columns}
  dataSource={groupedData as GroupRow[]}
  onChange={handleTableChange}
  columnsState={{
    persistenceKey: "report-columns-v2",
    persistenceType: "localStorage",
    onChange: (map) => setColumnsStateMap(map),
  }}
  scroll={{ x: 1100 }}
  sticky
  pagination={{ pageSize: 10, showSizeChanger: true }}

  expandable={
    groupBy.length
      ? {
          defaultExpandAllRows: true,
          rowExpandable: (r) => !!(r as any).__group, // only group headers are expandable
        }
      : undefined
  }
  summary={(pageData) => {
    // If grouping is active, show aggregates in group headers only
    if (groupBy.length > 0) return null;

    // pageData here are plain rows (no groups) because grouping is off
    const rows = pageData as Row[];

    // Compute aggregates for the numeric columns only, based on selected ops
    const aggValue: Record<string, number | string | undefined> = {};
    NUMERIC_COLS.forEach((key) => {
      const op = aggs[key];
      if (!op || op === "none") return;
      const values = rows.map((r) => r[key as keyof Row] as number);

      if (values.length === 0) return;

      switch (op) {
        case "sum":
          aggValue[key] = values.reduce((a, b) => a + b, 0);
          break;
        case "avg":
          aggValue[key] = (values.reduce((a, b) => a + b, 0) / values.length).toFixed(2);
          break;
        case "min":
          aggValue[key] = Math.min(...values);
          break;
        case "max":
          aggValue[key] = Math.max(...values);
          break;
        case "count":
          aggValue[key] = values.length;
          break;
      }
    });

    // Render a summary row aligned to whatever columns are currently visible
    return (
      <Table.Summary fixed>
        <Table.Summary.Row>
          {columns.map((col, idx) => {
            // ProColumns can have dataIndex as string | string[] | undefined
            const dataKey =
              (Array.isArray(col.dataIndex) ? col.dataIndex.join(".") : (col.dataIndex as string)) ||
              (col.key as string) ||
              "";

            // First cell = label
            if (idx === 0) {
              return (
                <Table.Summary.Cell index={idx} key={`sum-${idx}`}>
                  <span className="font-semibold">Aggregations</span>
                </Table.Summary.Cell>
              );
            }

            // Show value only for numeric columns we aggregated; empty for others
            const val = aggValue[dataKey];
            return (
              <Table.Summary.Cell index={idx} key={`sum-${idx}`}>
                {val ?? ""}
              </Table.Summary.Cell>
            );
          })}
        </Table.Summary.Row>
      </Table.Summary>
    );
  }}
/>


      {/* Grouping Modal */}
      <Modal
        title="Configure Grouping"
        open={groupOpen}
        onOk={() => setGroupOpen(false)}
        onCancel={() => setGroupOpen(false)}
      >
        <Space direction="vertical" className="w-full">
          {GROUPABLE_COLS.map((key) => {
            const checked = groupBy.includes(key);
            return (
              <Checkbox
                key={key}
                checked={checked}
                onChange={(e) => {
                  setGroupBy((prev) => (e.target.checked ? [...prev, key] : prev.filter((k) => k !== key)));
                }}
              >
                {key}
              </Checkbox>
            );
          })}
          {groupBy.length > 1 && (
            <div className="text-xs text-gray-500">Group order: {groupBy.join(" → ")}</div>
          )}
        </Space>
      </Modal>

      {/* Aggregation Modal */}
      <Modal
        title="Configure Aggregations"
        open={aggOpen}
        onOk={() => setAggOpen(false)}
        onCancel={() => setAggOpen(false)}
      >
        <Space direction="vertical" className="w-full">
          {NUMERIC_COLS.map((key) => (
            <div key={key} className="flex items-center justify-between">
              <div className="font-medium">{key}</div>
              <Select
                value={aggs[key] ?? "none"}
                onChange={(val) => setAggs((a) => ({ ...a, [key]: val as AggOp }))}
                style={{ width: 200 }}
                options={[
                  { label: "None", value: "none" },
                  { label: "Total (Sum)", value: "sum" },
                  { label: "Average", value: "avg" },
                  { label: "Min", value: "min" },
                  { label: "Max", value: "max" },
                  { label: "Count", value: "count" },
                ]}
                getPopupContainer={(triggerNode) => triggerNode.parentElement as HTMLElement}
              />
            </div>
          ))}
        </Space>
      </Modal>

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
const NavIcon = ({ src, size = 18 }: { src: string; size?: number }) => (
  <img
    src={src}
    width={size}
    height={size}
    alt=""
    style={{ display: "inline-block" , marginRight: "12px" , marginLeft: "-2px" }}
    onError={(e) => ((e.currentTarget.style.opacity = "0.35"))}
  />
);
/* --------------------- Page Layout Wrapper --------------------- */
export default function ReportTablePage() {
  const [collapsed, setCollapsed] = useState(false);

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
          icon: <NavIcon src={bookingURL} />,
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
          icon: <NavIcon src={clientsURL} />,
          label: "Customers",
          children: [
            { key: "customers:directory", label: "Client Directory" },
            { key: "customers:communications", label: "Communications" },
          ],
        },
        {
          key: "staff",
          icon: <NavIcon src={staffURL} />,
          label: "Staff",
          children: [
            { key: "staff:directory", label: "Staff Directory" },
            { key: "staff:timecard", label: "timecard" },
          ],
        },
        {
          key: "reporting",
          icon: <NavIcon src={reportingURL} />,
          label: "Reporting",
          children: [
            { key: "reporting:reports", label: "Reports" },
            { key: "reporting:datasources", label: "Data Sources" },
          ],
        },
        {
          key: "resources",
          icon: <NavIcon src={resourcesURL} />,
          label: "Resources",
          children: [
            { key: "resources:rooms", label: "Rooms" },
            { key: "resources:equipment", label: "Equipment" },
            { key: "resources:services", label: "Services" },
          ],
        },
        {
          key: "retail",
          icon: <NavIcon src={retailURL} />,
          label: "Retail",
          children: [
            { key: "retail:products", label: "Products" },
            { key: "retail:inventory", label: "Inventory" },
          ],
        },
        {
          key: "settings",
          icon: <NavIcon src={settingsURL} />,
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
      <div className="mt-auto p-4">
  {/* Company Name */}
  <div className="font-bold text-[11px] grey">UrBrand Resort & Spa</div>

  {/* Address */}
  <div className="text-[10px] mt-3">
    <EnvironmentOutlined className="mr-2" />
    <a
      href="https://maps.google.com?q=1111 Streetname Somecity Somestate 88888"
      target="_blank"
      rel="noopener noreferrer"
      className="!text-gray-500 hover:!text-gray-800 transition-colors">1111 Streetname, Somecity, ST 88888</a>
  </div>

  {/* Phone */}
  <div className="text-[10px] mt-1">
    <PhoneOutlined className="mr-2" />
    <a href="tel:5555555555" className="!text-gray-500 hover:!text-gray-800 transition-colors">(555) 555-5555</a>
  </div>

  {/* Website */}
  <div className="text-[10px] mt-1">
    <GlobalOutlined className="mr-2" />
    <a href="http://www.urbrandresortandspa.com" className="!text-gray-500 hover:!text-gray-800 transition-colors">www.urbrandresortandspa.com</a>
  </div>

  {/* Spacer */}
  <div className="mt-6 text-[9px]">
    <a href="#" className="!text-gray-500 hover:!text-gray-800 transition-colors">Terms of Use</a> |{" "}
    <a href="#" className="!text-gray-500 hover:!text-gray-800 transition-colors">Privacy & Cookie Policy</a>
  </div>

  {/* Powered by + Version */}
  <div className="flex items-end mt-10">
    <img
      src="https://www.realtimereservation.com/wp-content/uploads/2025/08/poweredbyRTR.svg"
      width="100"
      alt="Powered by RTR"
    />
    <div className="ml-auto text-[10px]">v2024.02</div>
  </div>
</div>
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
