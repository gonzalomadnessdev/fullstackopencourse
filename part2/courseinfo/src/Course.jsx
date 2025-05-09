import Header from "./Header"
import Content from "./Content"
import Total from "./Total"

const Course = ({ course }) => {
  return (
    <>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total
        total={
          course.parts.map((p) => p.exercises).reduce((acc, curr) => acc + curr, 0)
        }
      />
    </>
  )
}

export default Course