module.exports = app => {
    const { router, controller } = app;

    router.get('/user', controller.user.userList);
    router.post('/user', controller.user.addUser);
    router.delete('/user', controller.user.deleteUser);
    router.put('/user', controller.user.updateUser);
    router.post('/user/roles', controller.user.updateUserRoles);


    router.get('/user/info', controller.user.queryUserInfoasync);
    router.get('/patient/list', controller.user.patientList);
    router.get('/all/user', controller.user.allUserList);


    router.post('/dicom', controller.dicomList.addList);
    router.get('/dicom_list', controller.dicomList.getList);
    router.get('/dicom/all/list', controller.dicomList.getAllList);
    router.delete('/dicom', controller.dicomList.deletedList);

    router.post('/dicoms', controller.dicomList.add_dicoms);
    router.get('/dicoms', controller.dicomList.get_dicoms);


    router.post('/login', controller.account.login);
    router.post('/register', controller.account.register);
    router.post('/admin/login', controller.account.admin_login);
    router.put('/password', controller.account.password);

    router.get('/doctor/history/list', controller.doctorHistoryList.historyList);
    router.post('/doctor/history/list', controller.doctorHistoryList.addDoctorHistoryList);

    router.get('/letter', controller.letter.letterList);
    router.post('/letter', controller.letter.addLetterList);

    router.get('/test/image/list', controller.testImages.getList)
    router.get('/test/image/add', controller.testImages.addList)
    
    router.get('/test/list', controller.testList.getImageList)
    router.get('/test/list/add', controller.testList.addList)
    router.post('/test/list', controller.testList.edit)

};