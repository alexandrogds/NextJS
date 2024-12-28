'use client'
import { Line, Pie } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
)

export default function Dashboard() {
  const salesData = {
    labels: ['January', 'February', 'March'],
    datasets: [{
      label: 'Sales Performance',
      data: [65000, 72000, 68000],
      borderColor: 'rgb(75, 192, 192)',
      tension: 0.1
    }]
  }

  const leadsData = {
    labels: ['Website', 'Referral', 'Social Media', 'Direct'],
    datasets: [{
      data: [30, 25, 25, 20],
      backgroundColor: [
        'rgb(54, 162, 235)',
        'rgb(255, 99, 132)',
        'rgb(75, 192, 192)',
        'rgb(255, 205, 86)'
      ]
    }]
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Sales Dashboard</h1>
      
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="font-semibold">Total Sales</h3>
          <p className="text-2xl">$205,000</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="font-semibold">Conversion Rate</h3>
          <p className="text-2xl">24%</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="font-semibold">Leads Generated</h3>
          <p className="text-2xl">342</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="font-semibold mb-4">Sales Trend</h3>
          <Line data={salesData} />
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="font-semibold mb-4">Lead Sources</h3>
          <Pie data={leadsData} />
        </div>
      </div>
    </div>
  )
}
