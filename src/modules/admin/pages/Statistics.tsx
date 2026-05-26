import { useState } from 'react'
import Chart from 'react-apexcharts';
import Navbar from "../../../shared/layout/NavBar"

const Statistics = () => {
   const [series] = useState([
      {
         name: "Series 1",
         data: [30, 40, 35, 50, 49, 60, 70, 91, 125]
      }
   ]);

   const [options] = useState({
      colors: ['#C9A84C', '#C9A84C'],
      chart: {
         type: "line"
      },
      xaxis: {
         categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999]
      }
   });

   return (
      <>
         <div className="flex min-h-screen bg-(--bg)">
            <Navbar />
            <main className="flex-1 ml-64 p-8">
               <div className="mb-8">
                  <p className="sans text-xs text-(--text-faint) uppercase tracking-widest mb-1">Gestión</p>
                  <h1 className="serif text-3xl font-semibold text-(--text)">Estadísticas</h1>
               </div>
               <div>
                  <Chart options={options} series={series} type="line" height={350} />
               </div>
            </main>
         </div>
      </>
   )
}

export default Statistics