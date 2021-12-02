
export const getNamesIds= (arr) =>{
    const result=arr.map((stud)=>{
        return {name:stud.name, id: stud._id}
    })
        return result
}

export const getStudIds =(arr) =>{
    const result= arr.map((stud) =>{
        return stud.id
    })
    return result
}