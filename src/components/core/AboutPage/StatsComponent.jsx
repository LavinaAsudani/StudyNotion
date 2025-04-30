import React from 'react'

const  Stats = [
  {count:"5K", label:"Active Students"},
  {count:"10+", label:"Mentors"},
  {count:"200+", label:"Courses"},
  {count:"50+", label:"Awards"}
]

const StatsComponent = () => {
  return (
    <section className='bg-richblack-800 p-20 border-b-2 border-richblack-700'>
      <div className='w-11/12 max-w-maxContent mx-auto '>
        <div className='flex flex-row justify-around items-center  text-center'>
          {
            Stats.map((data , index) => {
              return (
                <div key={index}>
                   <h1 className='text-3xl font-semibold'>{data.count}</h1>
                   <h2 className='text-richblack-500 text-lg font-semibold'>{data.label}</h2>
                </div>
              )
            })
          }
        </div>
      </div>
    </section>
  )
}

export default StatsComponent
