import { msg } from "../pages/account_update/data/msg"
import { emailPattern, phonePattern, birthPattern, namePattern } from "../../common_data/validation_pattern";

const useProfileValidation = () => {
    const validateProfile = (profile) => {
        if (!namePattern.test(profile.memberName)) {
            alert(msg.NAME_FORMAT);
            return false;
        }
        if (!phonePattern.test(profile.memberPhone)) {
            alert(msg.PHONE_FORMAT);
            return false;
        }
        if(profile.memberSubEmail && !emailPattern.test(profile.memberSubEmail)){
            alert(msg.EMAIL_FORMAT);
            return false;
        }
        if(profile.memberBirth && !birthPattern.test(profile.memberBirth)){
            alert(msg.BIRTH_FORMAT);
            return false;
        }
        if (profile.memberRegionCity && !profile.memberRegionDistrict) {
            alert(msg.DISTRICT_SELECTION);
            return false;
        }
        return true;
    }
    return {validateProfile};
}
export default useProfileValidation;