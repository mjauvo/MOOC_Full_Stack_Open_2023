const Title = ({title}) => {
    return <h1>{title}</h1>
}

const Header = ({header}) => {
    return <h2>{header}</h2>
}
  
const Part = ({name, exercises}) => {
    //console.log('component - Part:')
    //console.log("-- name: ", name)
    //console.log("-- exercises: ", exercises)
    return (
        <p>{name}: {exercises}</p>
    )
}

const Total = ({parts}) => {
    //console.log("component - Total:")
    const init = 0;
    const total = parts.reduce((sum, current) =>
        /*console.log('total exercises: ', sum, current) ||*/ sum + current.exercises, init
    )
    //console.log('total exercises: ', total)

    return (
        <p><strong>Total of {total} exercises</strong></p>
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
        <>
            <Header  header = {course.name} />
            <Content parts  = {course.parts} />
            <Total   parts  = {course.parts}></Total>
        </>
    )
}

const Courses = ({courses}) => {
    return (
        <>
            {courses.map(course =>
                <Course key = {course.id} course = {course} />
            )}
        </>
    )
}

const App = () => {
    const courses = [
        {
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
                },
                {
                name: 'Redux',
                exercises: 11,
                id: 4
                }
            ]
        }, 
        {
            name: 'Node.js',
            id: 2,
            parts: [
                {
                name: 'Routing',
                exercises: 3,
                id: 1
                },
                {
                name: 'Middlewares',
                exercises: 7,
                id: 2
                }
            ]
        }
    ]
      
    return (
        <div>
            <Title title = "Web Development - Course curriculum" />
            <Courses courses = {courses} />
        </div>
    )
}
  
export default App