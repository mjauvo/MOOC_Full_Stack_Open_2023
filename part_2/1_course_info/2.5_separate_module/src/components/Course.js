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

const Course = ({course}) => {
    return (
        <>
            <Header  header = {course.name} />
            <Content parts  = {course.parts} />
            <Total   parts  = {course.parts}></Total>
        </>
    )
}

export default Course