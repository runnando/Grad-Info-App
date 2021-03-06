import  validate  from "validate.js";
import moment from "moment";
function AdmissionCourseTableDataModelHistoryArr(historyArr){
    let arr = [];
    if(validate.isEmpty(historyArr)){
        historyArr = [];
    }   
    for(let i = 0; i < historyArr.length; i++){
        let curobj = {
            course : !!historyArr[i].adHistoryCourseName ? historyArr[i].adHistoryCourseName : "",
            oper : !!historyArr[i].adHistoryCourseOper ? historyArr[i].adHistoryCourseOper : "",
            transactiondate: !!historyArr[i].adCourseTransdate ? historyArr[i].adCourseTransdate : "",
            apply : !!historyArr[i].adHistoryCourseApplyStatus ? historyArr[i].adHistoryCourseApplyStatus : false
        }
        arr.push(curobj);
    }
    return arr;
}
function AdmissionCourseTableDataModelArray(tableData){
    if(validate.isEmpty(tableData)){
        tableData = [];
    } 
    let arr = [];
    for(let i = 0; i < tableData.length; i++){
        let curobj = {
            key : i + 1,
            id: !!tableData[i].adCourseId ? tableData[i].adCourseId : "",
            course : !!tableData[i].adCourseName ? tableData[i].adCourseName : "",
            term : !!tableData[i].adCourseTerm ? tableData[i].adCourseTerm : "",
            grade : !!tableData[i].adCourseGrade ? tableData[i].adCourseGrade : "",
            units : !!tableData[i].adCourseUnits ? tableData[i].adCourseUnits.toFixed(2) : 0.00,
            gpts : !!tableData[i].adCourseGpts ? tableData[i].adCourseGpts.toFixed(2) : 0.00,
            applyCode : !!tableData[i].adCourseApplyCode ? tableData[i].adCourseApplyCode : "",
            oper : !!tableData[i].adCourseOper ? tableData[i].adCourseOper : "",
            history : !!tableData[i].adCourseHistory ? AdmissionCourseTableDataModelHistoryArr(tableData[i].adCourseHistory) : [],
            transactiondate: !!tableData[i].adCourseTransdate ? tableData[i].adCourseTransdate : "",
            apply : !!tableData[i].adCourseApplyStatus ? tableData[i].adCourseApplyStatus : false
        }
        arr.push(curobj);
    }
    return arr;
}

function AdmissionCourseTableDataModelChooseDisableOrAble(item){
    if(item.applyCode === "X"){
        return {
            disabled: true,
            key: item.key,
        }
    }
    else{
        return {
            key: item.key,
        }
    }
}
function AdmissionCourseTableDataModelItemCanBeChosedArray(tableData){
    const result = tableData.filter((item) => {
        return item.applyCode !== "X";
    })
    return result;
}
function AdmissionCourseTableDataModelItemChosedArray(tableData){
    const result = tableData.filter((item) => {
        return item.apply === true;
    })
    return result;
}
function AdmissionCourseTableDataModelSubmitDataObj(appliedArr, studentInfoObj, useroper){
    let res = {};
    let courselist = [];
    if(validate.isEmpty(appliedArr)){
        courselist = [];
    }
    if(validate.isEmpty(studentInfoObj)){
        studentInfoObj = {};
    }
    let studentObj = {
        studentId : !! studentInfoObj.id ? studentInfoObj.id : "",
        spPostNumber : !! studentInfoObj.studentPostNumber ? studentInfoObj.studentPostNumber : ""
    };
   
    for(let i = 0; i < appliedArr.length; i++){
        let curObj = {
            adCourseId : !!appliedArr[i].id ? appliedArr[i].id : "",
            adCourseOper : !!useroper ? useroper : "",
            adCourseTransdate : moment().format("MM/DD/YYYY")
        }
        courselist.push(curObj);
    }
    res = {
        studentInfo : studentObj,
        courseList : courselist
    }
    return res;
}
export const AdmissionCourseDataModel = {
    AdmissionCourseTableDataModelArray : AdmissionCourseTableDataModelArray,
    AdmissionCourseTableDataModelChooseDisableOrAble : AdmissionCourseTableDataModelChooseDisableOrAble,
    AdmissionCourseTableDataModelItemCanBeChosedArray : AdmissionCourseTableDataModelItemCanBeChosedArray,
    AdmissionCourseTableDataModelItemChosedArray : AdmissionCourseTableDataModelItemChosedArray,
    AdmissionCourseTableDataModelSubmitDataObj : AdmissionCourseTableDataModelSubmitDataObj
}