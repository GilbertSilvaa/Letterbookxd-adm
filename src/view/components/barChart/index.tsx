import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from 'chart.js'
import { Bar } from 'react-chartjs-2'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

type TBarChartProps = {
  title: string
  labels: string[]
  dataValues: number[]
  barColors?: string[]
}

export function BarChart({ title, labels, dataValues, barColors }: TBarChartProps) {
  const data = {
    labels,
    datasets: [
      {
        label: title,
        data: dataValues,
        backgroundColor: barColors || 'rgb(255, 111, 0)',
        borderColor: '#ff5500',
        borderWidth: 1,
      },
    ],
  }

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true
      },
    },
  }

  return <Bar data={data} options={options} />
}
