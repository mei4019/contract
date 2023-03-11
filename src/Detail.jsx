import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom";
import CryptoJS from 'crypto-js'
import { Button, Modal, Space } from "antd";
import { CheckCircleTwoTone } from "@ant-design/icons";
import './Detail.css';
const Detail = () => {
  const location = useLocation();
  const [data, setData] = useState();
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const encrypted = location.search.split('data=')[1]
    setData(decrypt(encrypted))
    console.log(decrypt(encrypted), location);
  }, [location])

  useEffect(() => {
    if (data?.isTermination === 2) {
      document.title = '借条解约'
    } else {
      document.title = '电子借条'
    }
  }, [data])

  const decrypt = (data) => {
    const bytes = CryptoJS.AES.decrypt(data, '123dk5');
    const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    return decryptedData
  }
  return (
    <div className="detail">
      <div className="box">
        <Space direction="vertical">
          <h1>{data?.isTermination === 2 ? '借条解约' : '电子借条'}</h1>
          <div>出借人：小茗</div>
          <div>借款人姓名：{data?.name || 'xxx'}</div>
          <div>借款人身份证号：{data?.IdCard || 'xxx'}</div>
          <div>借款金额：{data?.price || '1'}</div>
          {
            data?.isTermination === 2 ? (
              <div className='content'>
                本借条自 <b>小茗</b> 向 <b>{data?.name || 'xxx'}</b> 借款人确认时起失效，支付方式为 微信支付。
                本借条纠纷由出借人所明地人民法院管辖。
                立此为据。
              </div>
            ) : (
              <div className='content'>
                {data?.txt}
              </div>
            )
          }
        </Space>
      </div>
      {
        data?.isTermination === 2 ? (
          <Button
            className="btn"
            danger
            size="large" type='primary'
            onClick={() => {
              setVisible(true)
            }}>
            确认解约
          </Button>
        ) : (
          <Button
            className="btn"
            size="large" type='primary'
            onClick={() => {
              setVisible(true)
            }}
          >
            确定签约
          </Button>
        )
      }
      <Modal
        open={visible}
        closable={false}
        maskClosable={false}
        centered
        keyboard={false}
        title=''
        footer={null}
      >
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <CheckCircleTwoTone style={{ fontSize: '32px', marginRight: 10 }} twoToneColor="#52c41a" /> <span style={{ fontSize: '20px' }}>{data?.isTermination === 2 ? '解约成功' : '签约成功'}</span>
        </div>
      </Modal>
    </div>
  )
}

export default Detail