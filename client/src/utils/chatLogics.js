export const getReciever = (loggedUser, chatUsers) => {
    if(loggedUser.id === chatUsers[0]._id){
        return chatUsers[1]
    } else {
        return chatUsers[0]
    }
}