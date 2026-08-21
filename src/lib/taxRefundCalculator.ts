// KTRS & Easy-Tax-Refund 기반 외국인 전문 세금 환급 계산 엔진

export interface VisaTaxOption {
  code: string;
  name: string;
  badge: string;
  reductionRate: number; // 중소기업 외국인 감면율 (예: 0.7 = 70%)
  desc: string;
}

export const SUPPORTED_VISAS: VisaTaxOption[] = [
  {
    code: 'E-9',
    name: 'E-9 (비전문취업)',
    badge: '제조·뿌리·농축산',
    reductionRate: 0.9, // 90% 감면
    desc: '제조업/농축산업 근무자 최대 90% 소득세 감면 대상',
  },
  {
    code: 'E-7',
    name: 'E-7 (특정활동/전문)',
    badge: '전문인력·기술',
    reductionRate: 0.7, // 70% 감면
    desc: '조세특례제한법 외국인 단일세율 또는 감면 선택 가능',
  },
  {
    code: 'H-2',
    name: 'H-2 (방문취업)',
    badge: '동포 근로자',
    reductionRate: 0.85,
    desc: '5년 치 미환급 원천징수 근로소득세 전액 환급',
  },
  {
    code: 'F-4',
    name: 'F-4 (재외동포)',
    badge: '동포 비자',
    reductionRate: 0.8,
    desc: '연말정산 누락 공제항목(기본공제, 월세, 의료비 등) 경정청구',
  },
  {
    code: 'D-2/D-10',
    name: 'D-2/D-10 (유학/구직/인턴)',
    badge: '아르바이트·인턴',
    reductionRate: 0.8,
    desc: '시간제 취업(아르바이트) 원천징수 세금 3.3% 전액 환급',
  },
  {
    code: 'OTHER',
    name: '기타 비자 (F-2, F-5, F-6 등)',
    badge: '거주/영주',
    reductionRate: 0.75,
    desc: '최근 5년간 한국에서 납부한 종합소득세 및 근로소득세',
  },
];

export interface TaxCalculationResult {
  estimatedTotalRefund: number; // 총 환급금
  nationalTaxRefund: number;    // 국세 (소득세)
  localTaxRefund: number;       // 지방소득세 (10%)
  successFeePercent: number;    // 후불 성공 수수료율 (기본 22%)
  postPayFeeAmount: number;     // 환급 완료 후 지불할 수수료
  actualTakeHomeAmount: number; // 고객 실수령액
  appliedReductionRate: number; // 적용된 감면율
}

/**
 * 한국 근무기간, 월급, 비자 유형에 따른 정밀 예상 환급액 계산 함수
 */
export function calculateTaxRefund(
  years: number,
  monthlySalary: number,
  visaCode: string = 'E-9'
): TaxCalculationResult {
  const visa = SUPPORTED_VISAS.find((v) => v.code === visaCode) || SUPPORTED_VISAS[0];
  const annualSalary = monthlySalary * 12;

  // 한국 근로소득세 원천징수 추정율 (연봉 구간별 2.5% ~ 4.5%)
  let withholdingRate = 0.03;
  if (annualSalary > 40000000) withholdingRate = 0.042;
  else if (annualSalary > 30000000) withholdingRate = 0.035;
  else withholdingRate = 0.028;

  // 연간 낸 세금 추정액
  const estimatedAnnualTaxPaid = annualSalary * withholdingRate;

  // 감면율 및 미환급 소급 적용액 (최대 5년)
  const effectiveYears = Math.min(Math.max(years, 1), 5);
  const totalBaseTaxPaid = estimatedAnnualTaxPaid * effectiveYears;

  // 조특법 외국인 감면 + 연말정산 누락 공제 (환급 계수)
  const refundFactor = visa.reductionRate * 0.95;
  const estimatedTotalRefund = Math.round((totalBaseTaxPaid * refundFactor) / 10000) * 10000;

  // 국세 90%, 지방소득세 10%
  const nationalTaxRefund = Math.round(estimatedTotalRefund * 0.9);
  const localTaxRefund = estimatedTotalRefund - nationalTaxRefund;

  // 후불 수수료 정책: 선결제 0원, 환급 통장 입금 성공 시에만 22% 수수료
  const successFeePercent = 22;
  const postPayFeeAmount = Math.round((estimatedTotalRefund * (successFeePercent / 100)) / 1000) * 1000;
  const actualTakeHomeAmount = estimatedTotalRefund - postPayFeeAmount;

  return {
    estimatedTotalRefund,
    nationalTaxRefund,
    localTaxRefund,
    successFeePercent,
    postPayFeeAmount,
    actualTakeHomeAmount,
    appliedReductionRate: Math.round(visa.reductionRate * 100),
  };
}
