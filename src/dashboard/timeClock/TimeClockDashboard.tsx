import TimeClockHeader from "./TimeClockHeader";
import DateTimeExportData from "./DateTImeExportData";
import TimeClockTable from "./TimeClockTable";

export default function TimeClockDashboard() {
  return (
    <>
      <TimeClockHeader />
      <DateTimeExportData />
      <TimeClockTable />
    </>
  )
}
