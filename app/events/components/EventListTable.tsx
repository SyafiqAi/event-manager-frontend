"use client";

import * as React from "react";
import { DataGrid, GridColDef, GridPaginationModel } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import { Event } from "../interfaces/event.interface";

const columns: GridColDef<Event>[] = [
  //   { field: "id", headerName: "ID", width: 70 },
  { field: "name", headerName: "Name", width: 130 },
  { field: "location", headerName: "Location", width: 130 },
  { field: "status", headerName: "Status", width: 130 },
  {
    field: "startDate",
    headerName: "From",
    width: 130,
    valueGetter: (value, row) =>
      `${new Date(row.startDate).toLocaleDateString()}`,
  },
  {
    field: "endDate",
    headerName: "To",
    width: 130,
    valueGetter: (value, row) =>
      `${new Date(row.endDate).toLocaleDateString()}`,
  },
];

const paginationModel = { page: 0, pageSize: 5 };
type EventListTableProps = {
  data?: Event[];
  rowCount: number;
  isLoading: boolean;
  onPageChange: (model: GridPaginationModel) => void;
  paginationModel: GridPaginationModel;
};

export default function EventListTable({
  data,
  rowCount,
  isLoading,
  onPageChange,
  paginationModel,
}: EventListTableProps) {
  return (
    <Paper sx={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={data ?? []}
        columns={columns}
        pagination
        paginationMode="server"
        rowCount={rowCount}
        loading={isLoading}
        paginationModel={paginationModel}
        onPaginationModelChange={onPageChange}
        pageSizeOptions={[5, 10]}
        sx={{ border: 0 }}
      />
    </Paper>
  );
}
