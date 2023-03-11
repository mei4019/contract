import React, { useEffect, useState } from 'react';
import { Button, Card, Form, Input, InputNumber, message, Modal, Space } from 'antd';
import './Home.css'
import { useNavigate } from 'react-router-dom';
import CryptoJS from 'crypto-js'
import { CopyToClipboard } from 'react-copy-to-clipboard';

const Home = () => {
  useEffect(() => {
    document.title = '首页'
  }, [])
  const navigate = useNavigate();
  const [isTermination, setIsTermination] = useState(1)
  const onFinish = (values) => {
    values.isTermination = isTermination
    const encrypted = encrypt(values);
    window.scrollTo({
      left: 0,
      top: 0,
      behavior: 'smooth'
    })
    Modal.info({
      title: isTermination === 1 ? "电子借条" : '借条解约',
      content: (
        <CopyToClipboard text={`https://xaye123.github.io/contract/#/detail?data=${encrypted}`} onCopy={() => message.success('链接已复制')}>
          <Button type='link'>点击复制链接</Button>
        </CopyToClipboard>
      ),
      okText: '去预览',
      onOk() {
        navigate(`/detail?data=${encrypted}`)
      }
    })
  };

  const termination = () => {
    setIsTermination(2)
  }

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const encrypt = (data) => {
    return CryptoJS.AES.encrypt(JSON.stringify(data), '123dk5').toString()
  }
  return (
    <div className='home'>
      <Card
        bordered={false}
        className='box'
      >
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="姓名"
            name="name"
            rules={[{ required: true, message: '请输入姓名' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="身份证号"
            name="IdCard"
            rules={[{ required: true, pattern: /^\d{6}((((((19|20)\d{2})(0[13-9]|1[012])(0[1-9]|[12]\d|30))|(((19|20)\d{2})(0[13578]|1[02])31)|((19|20)\d{2})02(0[1-9]|1\d|2[0-8])|((((19|20)([13579][26]|[2468][048]|0[48]))|(2000))0229))\d{3})|((((\d{2})(0[13-9]|1[012])(0[1-9]|[12]\d|30))|((\d{2})(0[13578]|1[02])31)|((\d{2})02(0[1-9]|1\d|2[0-8]))|(([13579][26]|[2468][048]|0[048])0229))\d{2}))(\d|X|x)$/, message: '请输入身份证号' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="金额"
            name="price"
            rules={[{ required: true, message: '请输入金额' }]}
          >
            <InputNumber min={1} style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item
            label="内容"
            name="txt"
            rules={[{ required: true, message: '请输入金额' }]}
          >
            <Input.TextArea showCount maxLength={150} rows={8} />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Space direction='vertical'>
              <Button type="primary" htmlType="submit">
                生成借条
              </Button>
              <Button type="primary" onClick={termination} danger htmlType="submit">
                生成解约
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}

export default Home