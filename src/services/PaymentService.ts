import querystring from 'qs';
import crypto from 'crypto';
import moment from 'moment';

const VNP_TMN_CODE = 'U1TW8187';
const VNP_HASH_SECRET = '7WYO83YSYJB9UHC90NZSW46WEG8XX50T';
const VNP_URL = 'https://sandbox.vnpayment.vn/paymentv2/vpcpay.html';
const VNP_RETURN_URL = 'http://localhost:3000/payment-result';

interface VNPayParams {
    [key: string]: string | number;
}

export const PaymentService = {
  createVNPayUrl(amount: number, tuitionIds: string[], userId: string) {
    const date = new Date();
    const createDate = moment(date).format('YYYYMMDDHHmmss');
    const orderId = moment(date).format('HHmmss');
    
    const vnpParams: VNPayParams = {
      vnp_Version: '2.1.0',
      vnp_Command: 'pay',
      vnp_TmnCode: VNP_TMN_CODE,
      vnp_Locale: 'vn',
      vnp_CurrCode: 'VND',
      vnp_TxnRef: orderId,
      vnp_OrderInfo: `Thanh toan hoc phi - ${tuitionIds.join(',')}`,
      vnp_OrderType: 'other',
      vnp_Amount: amount * 100, // Nhân 100 vì VNPay yêu cầu số tiền x100
      vnp_ReturnUrl: VNP_RETURN_URL,
      vnp_IpAddr: '127.0.0.1',
      vnp_CreateDate: createDate,
    };

    // // Sắp xếp các tham số theo thứ tự a-z
    // const sortedParams = this.sortObject(vnpParams);
    
    // // Tạo chuỗi ký tự cần ký
    // const signData = querystring.stringify(sortedParams, { encode: false });
    
    // // Tạo chữ ký
    // const hmac = crypto.createHmac('sha512', VNP_HASH_SECRET);
    // const signed = hmac.update(Buffer.from(signData, 'utf-8')).digest('hex');
    
    // // Thêm chữ ký vào params
    // const finalParams = { ...sortedParams, vnp_SecureHash: signed };
    
    // // Tạo URL thanh toán
    // const paymentUrl = `${VNP_URL}?${querystring.stringify(finalParams, { encode: false })}`;

    // Sắp xếp các tham số theo thứ tự a-z
    const sortedKeys = Object.keys(vnpParams).sort();
    const sortedParams: VNPayParams = {};
    sortedKeys.forEach((key) => {
      sortedParams[key] = vnpParams[key];
    });

    // Tạo chuỗi ký tự cần ký
    const signData = Object.keys(sortedParams)
      .map(key => `${key}=${sortedParams[key]}`)
      .join('&');

    // Tạo chữ ký
    const hmac = crypto.createHmac('sha512', VNP_HASH_SECRET);
    const signed = hmac.update(Buffer.from(signData, 'utf-8')).digest('hex');
    
    // Thêm chữ ký vào params
    sortedParams.vnp_SecureHash = signed;
    
    // Tạo URL thanh toán
    const paymentUrl = `${VNP_URL}?${querystring.stringify(sortedParams, { encode: true })}`;
    
    console.log(paymentUrl);
    return paymentUrl;
  },

  sortObject(obj: any) {
    const sorted: any = {};
    const str = [];
    let key;
    for (key in obj) {
      if (obj.hasOwnProperty(key)) {
        str.push(encodeURIComponent(key));
      }
    }
    str.sort();
    for (key = 0; key < str.length; key++) {
      sorted[str[key]] = encodeURIComponent(obj[str[key]]).replace(/%20/g, "+");
    }
    return sorted;
  }
};