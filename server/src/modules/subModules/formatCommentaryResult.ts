import moment from 'moment'

export const formatCommentaryResult = (result: any) => {
    const finalResult = []
    for(const key in result){
        finalResult.push(
            {
                id: result[key]["commentary_id"],
                film_id: result[key]["commentary_film_id"],
                authorId: {
                    login: result[key]["user.id_login"],
                    avatar : result[key]["user.id_avatar"]
                },
                createdAt: moment(result[key]["commentary_createdAt"]).fromNow(),
                text: result[key]["commentary_text"]
            }
        )
    }
    return finalResult;
}