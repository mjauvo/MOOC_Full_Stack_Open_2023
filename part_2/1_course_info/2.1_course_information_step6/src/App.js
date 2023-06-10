const Header = ({header}) => {
    return <h1>{header}</h1>
}
  
const Part = ({name, exercises}) => {
    //console.log('component - Part:')
    //console.log("-- name: ", name)
    //console.log("-- exercises: ", exercises)
    return (
        <p>{name} {exercises}</p>
    )
}

const Content = ({parts}) => {
    //console.log('component - Content:')
    //console.log('-- parts: ', parts.length)
    return (
        <>
            {parts.map(part =>
                <Part key = {part.id} name = {part.name} exercises = {part.exercises} />
            )}
        </>
    )
}

const Course = ({course}) => {
    return (
        <div>
            <Header header = {course.name} />
            <Content parts = {course.parts} />
        </div>
    )
}

const App = () => {
    const course = {
        name: 'Half Stack application development',
        id: 1,
        parts: [
            {
            name: 'Fundamentals of React',
            exercises: 10,
            id: 1
            },
            {
            name: 'Using props to pass data',
            exercises: 7,
            id: 2
            },
            {
            name: 'State of a component',
            exercises: 14,
            id: 3
            }
        ]
    }
  
    return (
        <div>
            <Course course = {course} />
        </div>
    )
  }
  
  export default App