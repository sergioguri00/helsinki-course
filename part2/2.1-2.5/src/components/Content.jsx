import Part from './Part'

const Content = ({ parts }) => {
    return (
        <>
        <div>
            {parts.map(part => <Part key={part.id} name={part.name} exercises={part.exercises} />)}
        </div>
        <strong> total of {parts.reduce((sum, part) => sum + part.exercises, 0)} exercises</strong>
        </>
    )
}

export default Content