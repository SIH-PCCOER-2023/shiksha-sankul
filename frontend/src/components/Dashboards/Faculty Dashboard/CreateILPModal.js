import { useContext, useState, useEffect } from 'react';

import Modal from '../../UI/Modal/Modal';
// import Input from '../../UI/Input/Input';
// import { sendPatchRequest } from '../../../utils/sendHttp';
import { showAlert } from '../../../utils/alerts';
import UserContext from '../../../store/user-context';
import { sendGetRequest } from '../../../utils/sendHttp';

const CreateILPModal = (props) => {
  const userCtx = useContext(UserContext);
  const [ilps, setIlps] = useState([]);

  //   const submitHandler = async (event) => {
  //     try {
  //       const res = await sendPatchRequest(
  //         `/api/v1/university/${props.userId}/uploadSyllabus`,
  //         formData
  //       );

  //       if (res.data.status === 'success') {
  //         showAlert('success', 'ILP Generated Successfully');
  //       }
  //     } catch (err) {
  //       showAlert('error', err.response.data.message);
  //     }
  //   };
  useEffect(() => {
    const loadIlps = async () => {
      try {
        const res = await sendGetRequest(
          'http://localhost:8080/api/v1/ilptemplates'
        );

        if (res.status === 200) {
          setIlps(res.data);
        }
      } catch (error) {}

      // setLoading(false);
    };

    loadIlps();
  }, []);

  return (
    <Modal
      header="Select ILP Template"
      text={`Select the appropriate template for ${props.user.name}`}
      show={props.onShow}
      close={props.onClose}
      icon="fas fa-book-open"
    >
      <select>
        {ilps &&
          ilps.map((ilp, index) => (
            <option key={index}>{ilp.templateName}</option>
          ))}
      </select>
    </Modal>
  );
};

export default CreateILPModal;
