import React, { Component } from 'react';
import { Modal, Form, Input, Radio, Select } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;

const onCancel = () => {
  console.log('cancel');
};

const choices = [
  'an idea',
  'a question',
  'a fact',
  'a quote',
  'a word',
  'a passage',
  'something to think about'
];

const children = [
  <Option key="quote">quote</Option>,
  <Option key="fact">fact</Option>,
  <Option key="question">question</Option>,
  <Option key="word">word</Option>,
  <Option key="idea">idea</Option>
];

function handleChange(value) {
  console.log(`selected ${value}`);
}

const inititalValues = { isPrivate: true, quote: '' };

class AddQuoteModal extends Component {
  constructor() {
    super();
    this.state = { inspiration: choices[0], inspirationIndex: 0 };
  }
  componentDidMount() {
    this.inspirationInterval = setInterval(this.generateNewPlaceHolder, 1800);
  }
  componentWillUnmount() {
    clearInterval(this.inspirationInterval);
  }
  generateNewPlaceHolder = () => {
    if (this.state.inspirationIndex + 1 === choices.length) {
      clearInterval(this.inspirationInterval);
      return;
    }
    const inspirationIndex = this.state.inspirationIndex + 1;
    const inspiration = choices[inspirationIndex];
    this.setState({ inspiration, inspirationIndex });
  };
  render() {
    const { getFieldDecorator, validateFields, getFieldsValue } = this.props.form;

    const modalOpts = {
      title: (
        (
          <div>
            Add <strong className="letter-change">{this.state.inspiration}</strong> to Ponderist
          </div>
        )
      ),
      visible: true,
      onOk: () => {
        const data = { ...getFieldsValue() };
        console.log(data, 'ok');
      },
      onCancel,
      wrapClassName: 'vertical-center-modal',
      okText: 'Save',
      cancelText: 'Cancel'
    };
    return (
      <Modal {...modalOpts}>
        <Form layout="vertical">
          <FormItem label="Enter something to think about" hasFeedback>
            {getFieldDecorator('quote', {
              initialValue: inititalValues.quote,
              rules: [
                {
                  required: true,
                  message: "You don't need Ponderist to ponder nothing. Please enter at least 1 character :)"
                },
                { max: 300, message: 'Please enter a maximum of 300 characters' }
              ]
            })(
              <Input
                type="textarea"
                placeholder="e.g. a quote"
                autosize={{ minRows: 4, maxRows: 7 }}
              />
            )}
          </FormItem>
          <FormItem label="Do you want to make this public?">
            {getFieldDecorator('isPrivate', { initialValue: inititalValues.isPrivate })(
              <Radio.Group>
                <Radio size="large" value>No</Radio>
                <Radio size="large" value={false}>Yes</Radio>
              </Radio.Group>
            )}
          </FormItem>
          <FormItem label="Author to credit (optional)" hasFeedback>
            {getFieldDecorator('credit', {
              initialValue: inititalValues.credit,
              rules: [{ max: 100, message: 'Please enter a maximum of 100 characters' }]
            })(<Input size="large" placeholder="e.g. Abraham Lincoln" />)}
          </FormItem>
          <FormItem label="Labels for organizing (optional)">
            <Select
              size="large"
              tags
              style={{ width: '100%' }}
              searchPlaceholder="search labels..."
              onChange={handleChange}
            >
              {children}
            </Select>
          </FormItem>

        </Form>
      </Modal>
    );
  }
}
export default Form.create()(AddQuoteModal);
