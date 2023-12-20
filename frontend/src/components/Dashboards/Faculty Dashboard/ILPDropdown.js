import { useEffect, useState } from 'react';
import { sendGetRequest } from '../../../utils/sendHttp';

const ILPDropdown = (props) => {
  const [ilps, setIlps] = useState([]);

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
    <>
      <select>
        {ilps &&
          ilps.map((ilp, index) => (
            <option key={index}>{ilp.templateName}</option>
          ))}
      </select>
    </>
  );
};

export default ILPDropdown;
