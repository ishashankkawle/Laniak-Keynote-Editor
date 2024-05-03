import { sleep } from '@/app/_services/util'
import styles from './toast.module.css'
import res from '@/app/resources'
import { AlertCircle, CheckCircle, Loader, XCircle } from 'react-feather'
import React, { forwardRef, useImperativeHandle, useRef, useState } from 'react'

function Toast({props}, ref)
{

    let toastStateOnj = {
        isPopupDisplayOn: false,
        msg: "Hello from toast",
        type: "error"
    }

    const [toastState, updateToast] = useState(toastStateOnj)

    

    const togglePopupNotificationDisplay = async (message = "", iconType = "", timeout) => 
    {
        if (message != "" && message != undefined && message != null) 
        {
            updateToast({ isPopupDisplayOn: true, msg: message, type: iconType })
            //togglePopupNotificationDisplay("", "", timeout)
        }
        else 
        {
            await sleep(timeout)
            //updateToast({ isPopupDisplayOn: false  , msg : "" , type : "" })
        }
    }

    useImperativeHandle(ref, () => ({
        togglePopupNotificationDisplay
    }));

    const handleClose = (e) => 
    {
        updateToast({ isPopupDisplayOn: false  , msg : "" , type : "" })
    }


    if (toastState.isPopupDisplayOn) {

        let popIcon = ""

        if (toastState.type == res["POPUP_NOTIFICATION_MAP"]["type"]["ERROR"]) {
            popIcon = <XCircle className={`${styles.notifIcon} rounded me-2 text-success`} color='red' size={16} strokeWidth="3" />
        }
        else if (toastState.type == res["POPUP_NOTIFICATION_MAP"]["type"]["SUCCESS"]) {
            popIcon = <CheckCircle className={`${styles.notifIcon} rounded me-2 text-success`} color='green' size={16} strokeWidth="3" />
        }
        else if (toastState.type == res["POPUP_NOTIFICATION_MAP"]["type"]["WARNING"]) {
            popIcon = <AlertCircle className={`${styles.notifIcon} rounded me-2 text-success`} color='yellow' size={16} strokeWidth="3" />
        }
        else if (toastState.type == res["POPUP_NOTIFICATION_MAP"]["type"]["LOADING"]) {
            popIcon = <Loader className={`${styles.notifIcon} rounded me-2 text-success`} color='blue' size={16} strokeWidth="3" />
        }

        
        return (
            <div className="position-fixed" style={{"bottom" : "20px" , "right" : "15px"}}  ref={ref}>
                <div id="liveToast" className={`${styles.toastBlock} toast py-2`} role="alert" aria-live="assertive" aria-atomic="true">
                    <div className={`${styles.toastBlockHeader} toast-header`}>
                        {popIcon}
                        <b className="me-auto">{toastState.msg}</b>
                        <button onClick={handleClose} type="button btn-sm" className="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
                    </div>
                </div>
            </div>
        )
    }
    else {
        return null;
    }
}

export default React.forwardRef(Toast);