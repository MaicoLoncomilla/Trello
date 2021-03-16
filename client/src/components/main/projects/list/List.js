import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';

import { ToastTimer } from '../../../../utils/alerts/Alert';
import api from '../../../../redux/action-creator';
import actions from '../../../../redux/actions';

import sContainer from '../../../../styles/container.module.css';
import sButton from '../../../../styles/button.module.css';
import sText from '../../../../styles/text.module.css';

import BuildIcon from '@material-ui/icons/Build';
import DeleteIcon from '@material-ui/icons/Delete';

export default function List({ el, ModifyBoard, DeleteBoard }) {

    const dashboard = useSelector(state => state.dashboard)
    const user = useSelector(state => state.user)
    const dispatch = useDispatch()
    const { SPINNER } = actions
    const { DASHBOARD } = api
    const onHandleModifyProject = async (el) => {
        const { value: title } = await Swal.fire({
            title: 'Modify Board',
            input: 'text',
            inputValue: el.title,
            inputPlaceholder: "Board Title...",
            inputAttributes: { maxLength: 30 },
            showCancelButton: true,
            confirmButtonText: "Save Change",
            inputValidator: (value) => {
                if (!value) {
                    return 'Board need a title'
                }
            }
        })
        if(title){
            const index = user.dashboards.findIndex(board => board.uuid === el.uuid)
            let BoardModify = {
                title: title,
                uuid: el.uuid,
                idUser: user.id
            }
            ModifyBoard(title, index)
            dispatch(api.modifyDashboard(BoardModify))
        }
    }
    const onHandleDeleteBoard = (el) => {

        if (user.dashboards.length > 1) {
            Swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
            }).then((result) => {
                if (result.isConfirmed) {
                    const data = { uuid: el.uuid, idUser: user.id }
                    let position = user.dashboards.findIndex(board => board.uuid === el.uuid)
                    dispatch(api.deleteDashboard(data))
                    DeleteBoard(position)
                    dispatch({ type: DASHBOARD, payload: user.dashboards[position === 0 ? position++ : 0] })
                    dispatch(api.getColumn(user.dashboards[position === 0 ? position : 0].uuid))
                    ToastTimer.fire(
                        'Deleted!',
                        'Your board has been deleted.',
                        'success'
                    )
                }
            })
        } else {
            ToastTimer.fire(
                'Deny!',
                "you can't delete de last board",
                "warning"
            )
        }
    }
    const onHandleSelectProject = (el) => {
        dispatch({ type: DASHBOARD, payload: el })
        dispatch({ type: SPINNER, payload: true })
        dispatch(api.getColumn(el.uuid))
    }
    return (
        <div key={el.uuid} className={sContainer.listProjectMap}>
            <div>
                <p
                    className={dashboard.uuid === el.uuid ? sText.pSelected : sText.pNoSelected}
                >{el.title}</p>
                <button
                    className={dashboard.uuid === el.uuid ? sButton.buttonGreenSelected : sButton.buttonGreenNoSelected}
                    onClick={() => onHandleSelectProject(el)}>
                    {dashboard.uuid === el.uuid ? "Proyect Selected" : "Select this Project"}
                </button>
            </div>
            <div>
                <button
                    className={sButton.buttonGreenIcon}
                    onClick={() => onHandleModifyProject(el)}><BuildIcon />
                </button>
                <button className={sButton.buttonCloseIcon} onClick={() => onHandleDeleteBoard(el)}>
                   <DeleteIcon/>
                </button>
            </div>
        </div>
    )

}