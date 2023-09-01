import { postServerData } from '../helper/helper'
import * as Action from '../redux/result_reducer'

export const pushAnswer = (result) => async (dispatch) => {
    try {
        await dispatch(Action.pushResultAction(result))
    } catch (error) {
        console.log(error)
    }
}

export const updateResult = (index) => async (dispatch) => {
    try {
        dispatch(Action.updateResultAction(index))
    } catch (error) {
        console.log(error)
    }

}


//insert user data

// export const usePublishResult = (resultData) => {
//     const { result, username } = resultData;
//     (async () => {
//         try {
//             if (result !== [] && !username) throw new Error("Couldn't get Result");
//             const cacheBuster = new Date().getTime();
//             await postServerData(`${process.env.REACT_APP_SERVER_HOSTNAME}/api/result?cacheBuster=${cacheBuster}`, resultData, data => data)
//         } catch (error) {
//             console.log(error)
//         }
//     })(0);
// }


export const usePublishResult = (resultData) => {
    const { result, username } = resultData;
    (async () => {
        try {
            if (result !== [] && !username) throw new Error("Couldn't get Result");

            // Add a cache-busting query parameter with a timestamp
            const cacheBuster = new Date().getTime();
            const url = `${process.env.REACT_APP_SERVER_HOSTNAME}/api/result?cacheBuster=${cacheBuster}`;

            await postServerData(url, resultData, (data) => data);
        } catch (error) {
            console.log(error);
        }
    })();
};
