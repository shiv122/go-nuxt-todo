import { toast } from "vue-sonner";

export const useErrorHandler = (err) => {
    const { $toast } = useNuxtApp();
    console.log(err.response.status);
    switch (err.response.status) {
        case 401:
            $toast.error("Unauthorized", {
                description: "Username Or Password is incorrect"
            })
            break;

        case 400:
            showBadRequestErrorMessage(err.response.data)
            break

        default:
            $toast.error("Something went wrong")
            break;
    }
}



function showBadRequestErrorMessage(data) {


    for (let i = 0; i < data.length; i++) {

        toast.error("Validation Error", {
            description: data[i].message
        });
    }


}