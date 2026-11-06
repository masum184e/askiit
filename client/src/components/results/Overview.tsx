import React from 'react'
import { GradeDistribution } from './overview/grade-distribution'
import { GradePointDistribution } from './overview/grade-point-distribution'

const Overview = () => {
  return (
     <div className="grid grid-cols-1 lg:grid-cols-2 print:grid-cols-1 gap-6">
        <GradeDistribution />
        <GradePointDistribution />
     </div>
  )
}

export default Overview