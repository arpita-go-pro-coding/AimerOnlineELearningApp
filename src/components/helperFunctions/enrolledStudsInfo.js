export const getEnrolledStudsIds =(arr) =>{
    const result= arr.students.map((stud)=>{
        return stud.student
    })
    return result
}