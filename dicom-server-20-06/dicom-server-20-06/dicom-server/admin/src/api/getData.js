import fetch from '@/config/fetch'

export const login = data => fetch('/admin/login', data, 'POST');

export const getUserList = data => fetch('/user', data);
export const deleteUserList = data => fetch('/user', data, 'DELETE');

export const getDicomList = data => fetch('/dicom/all/list', data);
export const deleteDicomList = data => fetch('/dicom', data, 'DELETE');

export const getDoctorDicomList = data => fetch('/doctor/history/list', data);
export const postUserRoles = data => fetch('/user/roles', data, 'POST');


// export const postCommentListEssence = data => fetch('/comment/essence', data, 'POST');
