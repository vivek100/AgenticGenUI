"use client"

// This file serves as a registry for all component code in the agentic-ui folder
// It provides a way to dynamically access component code for the integration file

// Create a map of component names to their mock code
export const componentCodeMap: Record<string, string> = {
  "metric-card": `import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowDown, ArrowUp } from 'lucide-react';

export interface MetricCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon?: React.ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
    label: string;
  };
  className?: string;
}

export function MetricCard({
  title,
  value,
  description,
  icon,
  trend,
  className,
}: MetricCardProps) {
  return (
    <Card className={className}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon && <div className="h-4 w-4 text-muted-foreground">{icon}</div>}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {description && (
          <p className="text-xs text-muted-foreground">{description}</p>
        )}
        {trend && (
          <div className="flex items-center pt-1">
            {trend.isPositive ? (
              <ArrowUp className="h-4 w-4 text-green-500" />
            ) : (
              <ArrowDown className="h-4 w-4 text-red-500" />
            )}
            <span
              className={\`text-xs \${
                trend.isPositive ? "text-green-500" : "text-red-500"
              }\`}
            >
              {trend.value}%
            </span>
            <span className="text-xs text-muted-foreground ml-1">
              {trend.label}
            </span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}`,

  chart: `import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  ChartData,
  ChartOptions,
} from 'chart.js';
import { Bar, Line, Pie, Doughnut } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

export interface ChartProps {
  type: 'bar' | 'line' | 'pie' | 'doughnut';
  data: ChartData<any>;
  options?: ChartOptions<any>;
  height?: number;
  width?: number;
  className?: string;
}

export function Chart({ type, data, options, height, width, className }: ChartProps) {
  const defaultOptions: ChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
    },
    ...options,
  };

  const renderChart = () => {
    switch (type) {
      case 'bar':
        return <Bar data={data} options={defaultOptions} height={height} width={width} />;
      case 'line':
        return <Line data={data} options={defaultOptions} height={height} width={width} />;
      case 'pie':
        return <Pie data={data} options={defaultOptions} height={height} width={width} />;
      case 'doughnut':
        return <Doughnut data={data} options={defaultOptions} height={height} width={width} />;
      default:
        return <Bar data={data} options={defaultOptions} height={height} width={width} />;
    }
  };

  return <div className={className}>{renderChart()}</div>;
}`,

  "data-table": `import React from 'react';
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  SortingState,
  getSortedRowModel,
  ColumnFiltersState,
  getFilteredRowModel,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  searchable?: boolean;
  searchColumn?: string;
  pagination?: boolean;
  pageSize?: number;
  className?: string;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  searchable = false,
  searchColumn,
  pagination = false,
  pageSize = 10,
  className,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: pagination ? getPaginationRowModel() : undefined,
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
    },
    initialState: {
      pagination: {
        pageSize,
      },
    },
  });

  return (
    <div className={className}>
      {searchable && searchColumn && (
        <div className="flex items-center py-4">
          <Input
            placeholder="Search..."
            value={(table.getColumn(searchColumn)?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn(searchColumn)?.setFilterValue(event.target.value)
            }
            className="max-w-sm"
          />
        </div>
      )}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      {pagination && (
        <div className="flex items-center justify-end space-x-2 py-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
}`,

  // Add more components as needed...
}

// Create a map of core files
export const coreCodeMap: Record<string, string> = {
  index: `// Main entry point for the agentic-ui library
export * from './components';
export * from './hooks/use-agent-actions';
export * from './registry';
export * from './ag-ui-client';`,

  registry: `import React from 'react';

// Component registry for dynamic rendering
const componentRegistry = new Map<string, React.ComponentType<any>>();

export function registerComponent(name: string, component: React.ComponentType<any>) {
  componentRegistry.set(name, component);
}

export function getComponent(name: string) {
  return componentRegistry.get(name);
}

export function renderAgentComponent(name: string, props: any) {
  const Component = getComponent(name);
  if (!Component) {
    console.error(\`Component \${name} not found in registry\`);
    return null;
  }
  return <Component {...props} />;
}`,

  "hooks/use-agent-actions": `import { useState, useCallback } from 'react';

export interface AgentAction {
  type: string;
  payload: any;
}

export interface AgentActionOptions {
  onSuccess?: (result: any) => void;
  onError?: (error: Error) => void;
}

export function useAgentActions() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [result, setResult] = useState<any>(null);

  const executeAction = useCallback(
    async (action: AgentAction, options?: AgentActionOptions) => {
      setIsLoading(true);
      setError(null);
      
      try {
        // This would typically call an API or perform some action
        console.log(\`Executing action: \${action.type}\`, action.payload);
        
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const actionResult = { success: true, data: action.payload };
        setResult(actionResult);
        options?.onSuccess?.(actionResult);
        return actionResult;
      } catch (err) {
        const error = err instanceof Error ? err : new Error(String(err));
        setError(error);
        options?.onError?.(error);
        throw error;
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  return {
    executeAction,
    isLoading,
    error,
    result,
  };
}`,

  "ag-ui-client": `// Client for interacting with the agentic UI system
import { AgentAction } from './hooks/use-agent-actions';

class AgUiClient {
  private apiUrl: string;
  
  constructor(apiUrl: string = '/api/agentic-ui') {
    this.apiUrl = apiUrl;
  }
  
  async executeAction(action: AgentAction): Promise<any> {
    const response = await fetch(this.apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(action),
    });
    
    if (!response.ok) {
      throw new Error(\`Action failed: \${response.statusText}\`);
    }
    
    return response.json();
  }
  
  async getComponentData(componentType: string, params: any): Promise<any> {
    const action: AgentAction = {
      type: 'GET_COMPONENT_DATA',
      payload: {
        componentType,
        params,
      },
    };
    
    return this.executeAction(action);
  }
}

export const agUiClient = new AgUiClient();`,

  "components/index": `// Export all components
export * from './metric-card';
export * from './chart';
export * from './data-table';
// Add more exports as needed...`,
}

// Generate mock code for components not explicitly defined
const generateMockCode = (componentName: string): string => {
  const pascalCaseName = componentName
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join("")

  return `import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export interface ${pascalCaseName}Props {
  // Add props here
  title?: string;
  className?: string;
}

export function ${pascalCaseName}({ title = "${pascalCaseName}", className }: ${pascalCaseName}Props) {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        {/* ${pascalCaseName} implementation */}
        <p>This is the ${componentName} component</p>
      </CardContent>
    </Card>
  );
}`
}

// List of all component names
const allComponentNames = [
  "metric-card",
  "chart",
  "data-table",
  "confirmation-card",
  "user-form",
  "toggle-switch",
  "info-banner",
  "progress-bar",
  "avatar-card",
  "timeline",
  "multi-step-form",
  "search-with-filters",
  "date-time-range-picker",
  "rating-selector",
  "kanban-board",
  "checklist-with-progress",
  "approval-workflow-card",
  "team-member-list",
  "product-catalog-grid",
  "cart-summary-panel",
  "payment-details-form",
  "message-feed",
  "order-status-tracker",
  "data-grid",
  "expandable-row-table",
  "column-toggle-table",
  "threaded-comments",
  "tab-layout",
  "accordion-content",
  "code-snippet-viewer",
  "color-picker-popover",
  "image-gallery",
  "language-selector",
  "theme-toggle",
  "modal-prompt",
  "toast-stack",
  "org-chart-viewer",
  "markdown-renderer",
  "mention-input",
  "environment-switcher",
  "editable-data-table",
  "crud-data-table",
  "location-map",
  "route-planner-map",
  "ai-prompt-builder",
  "metric-card-grid",
  "fallback-component",
]

// Function to get all component names
export const getAllComponentNames = (): string[] => {
  return allComponentNames
}

// Function to get component code by name
export const getComponentCode = (name: string): string => {
  if (componentCodeMap[name]) {
    return componentCodeMap[name]
  }
  return generateMockCode(name)
}

// Function to get all core file names
export const getAllCoreFileNames = (): string[] => {
  return Object.keys(coreCodeMap)
}

// Function to get core file code by name
export const getCoreFileCode = (name: string): string => {
  return coreCodeMap[name] || `// File ${name} not found`
}
