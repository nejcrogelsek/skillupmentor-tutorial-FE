import DashboardLayout from 'components/ui/DashboardLayout'
import { FC, useEffect } from 'react'
import * as C3 from 'c3'
import * as API from 'api/Api'

const Dashboard: FC = () => {
  useEffect(() => {
    (async () => {
      const chart = C3.generate({
        bindto: '#chart',
        data: {
          x: 'x',
          columns: [['x'], ['Sales']],
          types: {
            Sales: 'bar',
          },
        },
        axis: {
          x: {
            type: 'timeseries',
            tick: {
              format: '%Y-%m-%d',
            },
          },
        },
      })

      const { data } = await API.fetchChart()
      chart.load({
        columns: [
          ['x', ...data.map((r: any) => r.date)],
          ['Sales', ...data.map((r: any) => r.sum)],
        ],
      })
    })()
  }, [])

  return (
    <DashboardLayout>
      <h1 className="mb-4">Daily Sales</h1>

      <div id="chart"></div>
    </DashboardLayout>
  )
}

export default Dashboard
