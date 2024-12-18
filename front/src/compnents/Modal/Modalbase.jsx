import './modal.css'
import EnhancedSetting from './setting/EnhancedSetting'
import MinSetting from './setting/MinSetting';
import PauseSetting from './setting/PauseSetting';

const Modalbase = ({name,setName,setModalOn}) => {
    console.log(name);
    const closeModalBox = () => {
        setName("");
        setModalOn(false);
    }
  return (
    <div className='modal-container'>
       <div>
            {name === 'enhanced' && <EnhancedSetting 
            setModalOn={setModalOn} 
            closeModalBox ={closeModalBox} />}
            {
              name === 'min' && <MinSetting 
              setModalOn={setModalOn} 
              closeModalBox ={closeModalBox}
              />
            }
            {
              name === 'pause' &&  <PauseSetting 
              setModalOn={setModalOn} 
              closeModalBox ={closeModalBox}
              />
            }
       </div>
    </div>
  )
}

export default Modalbase