import axios from "./axios";
import setting from '../setting.json'

const ipAddress = setting.Api.ServerIP;

export const getAdmissionCourseTableDataByIDAndPostNumber = async (studentID, postNumber) =>{
    const response = await axios.get(`${ipAddress}/admission/getAdmissionCourseTableDataByIDAndPostNumber?studentId=${studentID}&spPostNumber=${postNumber}`);
    const data = await response.data;
    return data;
}

export const postAdmissionCourseTableDataByNewArr = async (dataObj) => {
    const response = await axios.post(`${ipAddress}/admission/postAdmissionCourseTableDataByNewArr`, dataObj);
    const data = await response.data;
    return data;
}