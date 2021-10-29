import React from 'react'

const Sum = ({sum}) => <strong>Total of {sum} exercises</strong>

const Part = ({name, exercises}) => <p>{name} {exercises}</p>

const Content = ({parts}) => {
  const sum = parts.map(part => part.exercises).reduce((prev, next) => prev + next)

  return (
    <div>
      {parts.map(part =>
        <Part key={part.id} name={part.name} exercises={part.exercises} />
      )}
      <Sum sum={sum} />
    </div>
  )
}

const CourseHeader = ({name}) => <h2>{name}</h2>

const Course = ({course}) => {
  return (
    <div>
      <CourseHeader name={course.name} />
      <Content parts={course.parts} />
    </div>
  )
}

export default Course