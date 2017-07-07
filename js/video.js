/**
 * Created by Administrator on 2017/6/27.
 */
window.onload=function(){
    var oVideoBox=document.querySelector('.videoBox');
    var videoBox_l=oVideoBox.offsetLeft;

    var oV=document.getElementById('v1');
    var oPlay=document.querySelector('#play');
    var oPause=document.querySelector('#pause');
    var oStop=document.querySelector('#stop');
    var oNext=document.querySelector('#next');
    var oPrev=document.querySelector('#prev');
    var oTotalTime=document.querySelector('#totalTime');
    var oTimeThis=document.querySelector('#curTime');

    var oLastTimeBtn=document.querySelector('#lastTime');


    var time=3;  //���������ʱ��
    var fnPause=function(){
        oPlay.style.display='block';
        oPause.style.display='none';
    };
    var fnPlay=function(){
        oPlay.style.display='none';
        oPause.style.display='block';
    };


    //��localStorage
    var localStorageT=localStorage.time;
    if(localStorageT){
        oLastTimeBtn.style.display='block';

        //�����������
        oLastTimeBtn.onclick=function(){
            oV.currentTime=localStorageT;
            oV.play();
            fnPlay();
        };
    }


    //1. ���š���ͣ��ֹͣ�����������
    oPlay.onclick=function(){
        oV.play();
        fnPlay();
    };
    oPause.onclick=function(){
        oV.pause();
        fnPause();
    };
    oStop.onclick=function(){
        oV.currentTime=0;
        oV.pause();
        fnPause();
    };
    oNext.onclick=function(){
        oV.currentTime+=time;
    };
    oPrev.onclick=function(){
        oV.currentTime-=time;
    };

    //���Ž���
    var oSpeedBox=document.querySelector('.speed');
    var oSpeed_this=document.querySelector('.speed_this');
    var oSpeedBtn=document.querySelector('.speed_this .button');

    oV.ontimeupdate=function(){
        var scale=oV.currentTime/oV.duration;
        oSpeed_this.style.width=scale*100+'%';

        oTimeThis.innerHTML=parseInt(oV.currentTime/60)+':'+parseInt(oV.currentTime%60);

        //��localStorage
        localStorage.time=oV.currentTime;
        oTotalTime.innerHTML=parseInt(oV.duration/60)+':'+parseInt(oV.duration%60);
    };
    //��ק
    oSpeedBtn.onmousedown=function(ev){
        var disX=ev.clientX-this.offsetLeft-this.offsetWidth;

        document.onmousemove=function(ev){
            var l=ev.clientX-disX;
            var scale=l/oSpeed_this.parentNode.offsetWidth;
            scale>=1 && (scale=1);
            scale<=0 && (scale=0);
            oSpeed_this.style.width=scale*100+'%';

            oV.currentTime=scale*oV.duration;
        };
        document.onmouseup=function(){
            document.onmousemove=null;
            document.onmouseup=null;
        };
        return false;
    };

    //�����������
    oSpeedBox.onclick=function(ev){
        var scale=(ev.clientX-videoBox_l)/oSpeedBox.offsetWidth;
        oSpeed_this.style.width=scale*100+'%';

        oV.currentTime=scale*oV.duration;
    };

    //3. �������
    var oSpeedBuffer=document.querySelector('.speed_buffer');
    oV.onprogress=function(){
        //document.title=oV.buffered.end(0);
        var scale=oV.buffered.end(0)/oV.duration;
        oSpeedBuffer.style.width=scale*100+'%';
    };

    //ʱ��



    //����
    var oImg=document.querySelector('.full img');

    var bSign=true;
    oImg.onclick=function(){
        if(bSign){
            this.style.background='red';
            oV.muted=true;
        }else{
            this.style.background='';
            oV.muted=false;
        }
        bSign=!bSign;
    };

    ;(function(){
        var oVolumeBox=document.querySelector('.volume');
        var oVolumeThis=document.querySelector('.volume_this');
        var oBtn=document.querySelector('.volume_this .button');

        oBtn.onmousedown=function(ev){
            var disX=ev.clientX-this.offsetLeft-this.offsetWidth;
            document.onmousemove=function(ev){
                var l=ev.clientX-disX;
                var scale=l/oVolumeBox.offsetWidth;
                scale<=0 && (scale=0);
                scale>=1 && (scale=1);
                oVolumeThis.style.width=scale*100+'%';

                oV.volume=scale;
            };
            document.onmouseup=function(){
                document.onmousemove=null;
                document.onmouseup=null;
            };
            return false;
        };
    })();

    //�������
    oV.onended=function(){
        //ɾ��localStorage
        localStorage.removeItem('time');

        //���
        document.querySelector('#ad').style.display='block';
    };
    var oMedia=document.querySelector(".media__body");
    oMedia.onclick= function () {
        oVideoBox.style.display="block";
    }
};