(function(){
    $(function () {
        var url=window.location.href;
        var obj={};
        if(url.indexOf('?')!=-1){
            var str=url.substring(url.indexOf('?')+1);
            var arr=str.split('&');
            for(var i=0;i<arr.length;i++){
                obj[arr[i].split('=')[0]]=arr[i].split('=')[1]
            }
        }
        var userId=obj.uid;
        var organizationId=obj.orgid;
        var projectId=obj.projectid;
        var version=obj.version;
        console.log(obj)
        function list(){    //列表展示
            $.ajax({
                url:"http://app.zhuangneizhu.com/project/editProjectMember.do",
                type:"post",
                data:{ 
                    userId:userId,
                    organizationId:organizationId,
                    projectId:projectId,
                    version:version,
                },
                dataType:"json",
                success:function(data){
                    message=data.data
                }
            })
            .done(function(){
                $('main .content1').html('');
                $.each(message,function(index,item){ 
                    var html=`
                    <div class="li">
                        <div class="checkbox"><input type="checkBox" ${item.isCheck?'checked':''} title=${item.organizationUserId}> </div> 
                        <div class="name">${item.name}</div>
                        <div class="roleName">${item.roleName}</div>
                        <div class="mobile">${item.mobile}</div>
                    </div>`
                    $('main .content1').append(html)
                })   
                var arr=[];
                $('.main1 input:checkbox:checked').each(function (index, item) {
                    arr.push(item.title)
                });
                //设置全选和全不选
                if(arr.length===message.length){
                    $('input:checkbox').prop("checked", true)
                }else{
                    $('footer input').prop("checked", false)
                }
            })
        };
        list();
    
        function btn1(){    //btn提交
            var arr1=[];
            $('.main1 input:checkbox:checked').each(function (index, item) {
                arr1.push(item.title)
            }); 
            var my=arr1.toString();
            $.ajax({   //添加项目成员
                url:"http://app.zhuangneizhu.com/project/addProjectMember.do",
                type:"post",
                dataType:"json",
                data:{
                    projectId:projectId,
                    organizationUserIds:my,
                    version:version,
                    userId:userId,
                    organizationId:organizationId
                },
                success:function(res){
                    if(res.code==10000){
                        console.log(res);
                        // list();
                    }else if(res.code==10010){
                        list();
                        $('.alert').fadeIn(400);
                        setTimeout(function(){
                            $('.alert').fadeOut(400);
                        },600);
                    }else{
                        return;
                    }
                },
            })
        };
    
        $('.content1').on('click','.li .checkbox input',function(){
            btn1();
        })
    
        $('.btn1').on('click',function(){
            var arr1=[];
            $('.main1 input:checkbox:checked').each(function (index, item) {
                arr1.push(item.title)
            }); 
            var my=arr1.toString()
            $.ajax({   //添加项目成员
                url:"http://app.zhuangneizhu.com/project/addProjectMember.do",
                type:"post",
                dataType:"json",
                data:{
                    projectId:projectId,
                    organizationUserIds:my,
                    version:version,
                    userId:userId,
                    organizationId:organizationId
                },
                success:function(res){
                    console.log(res)
                    if(res.code==10000){
                        list();
                        $('.box').fadeIn(400);
                        setTimeout(function(){
                            $('.box').fadeOut(400);
                        },1500);
                    }else if(res.code==10010){
                        $('.alert').fadeIn(400);
                        setTimeout(function(){
                            $('.alert').fadeOut(400);
                        },1500);
                        list();
                    }else{
                        return;
                    }
                },
            })
        });
    
    
        $('.search input').on('input',function(){
            $('.main1').hide();
            $('.main2').show();
            $('.btn1').hide();
            $('.btn2').show();
            $('footer').hide();
            
            if($('.search input').val()===''){
                location.reload();
            }
            
            $.ajax({ //获取项目列表
                url:"http://app.zhuangneizhu.com/project/editProjectMember.do",
                type:"post",
                dataType:"json",
                data:{ 
                    userId:userId,
                    organizationId:organizationId,
                    projectId:projectId,
                    version:version,
                    qname:$('.search input').val()
                },
                success:function(res){
                    data=res.data; 
                    if(res.code==10000){
                        $('.content2').html('');     
                    }
                }
            }).done(function(){
                $.each(data,function(index,item){
                    var html=`
                        <div class="li">
                            <div class="checkbox"><input type="checkBox" ${item.isCheck?'checked':''} title=${item.organizationUserId}></div>
                            <div class="name">${item.name}</div>
                            <div class="roleName">${item.roleName}</div>
                            <div class="mobile">${item.mobile}</div>
                        </div>`
                    $('.content2').append(html)
                })
    
                arr0=[];
                $('.main2 input:checkbox:checked').each(function (index, item) {
                    arr0.push(item.title)
                }); 
                
                $('.btn2').on('click',function(){
                    location.reload();
                }) 
            })  
        })
        $('.cancel').on('click',function(){
            location.reload();
        })
    
        $('footer input').on('click',function(){
            console.log(123)
            if($(this).prop("checked")){
                $('input:checkbox').prop("checked", true)
            }else{
                $('input:checkbox').prop("checked", false)
            }
        })
        
        $('.main1').on('click','.content1 .li .checkbox input',function(){
            var arr=[];
            $('.main1 input:checkbox:checked').each(function (index, item) {
                arr.push(item.title)
            });
            if(arr.length===message.length){
                $('input:checkbox').prop("checked", true)
            }else{
                $('footer input').prop("checked", false)
            }
        }) 
        
        $('.content2').on('click','.li .checkbox input',function(){
            var arr1=[];
            $('.main1 input:checkbox:checked').each(function (index, item) {
                arr1.push(item.title)
            }); 
            var arr2=[];
            $('.main2 input:checkbox:checked').each(function (index, item) {
                arr2.push(item.title);
            });
            for(var i=0;i<arr0.length;i++){
                for(var j=0;j<arr1.length;j++){
                    if(arr1[j]==arr0[i]){
                        arr1.splice(j,1)
                    }
                }
            }
            var my=arr1.concat(arr2).join(',');
            $.ajax({   //添加项目成员
                url:"http://app.zhuangneizhu.com/project/addProjectMember.do",
                type:"post",
                dataType:"json",
                data:{
                    projectId:projectId,
                    organizationUserIds:my,
                    version:version,
                    userId:userId,
                    organizationId:organizationId
                },
                success:function(res){
                    if(res.code==10000){
                        list();
                    }else if(res.code==10010){
                        $('.alert').fadeIn(400);
                        setTimeout(function(){
                            $('.alert').fadeOut(400);
                        },1500);
                        list();
                    }else{
                        return;
                    }          
                },
            })
        })
     });
})()

