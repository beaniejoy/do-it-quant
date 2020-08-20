
console.log("worker start")
postMessage("최신 업데이트 확인중입니다.");



update_companyData = (companyData) =>{
    console('update_companyData')
    .postMessage("기업 정보 업데이트 중입니다.")
    AsyncStorage.setItem('updated_date',new Date().toDateString())
    companyData.map( (value,index)=>{
        if(index<20)
            
            //  appRef.current.setState({loadingText:'기업 정보 업데이트 중입니다.'});
            //AsyncStorage.getItem(value.cmpName,(err,value)=>{err==null&& AsyncStorage.setItem(value.cmpName,value)}) 
                console.log(data);
                console.log('Today:'+new Date().toDateString());
          
       
    }); 
}

AsyncStorage.getItem('updated_date').then(function(data) {
   
    (data!=new Date().toDateString())&&update_companyData(companyData);
    worker.postMessage('end');
     })
