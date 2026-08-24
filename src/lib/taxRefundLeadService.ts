import { supabase, isSupabaseConfigured } from '@/lib/supabaseClient';

export interface TaxRefundLead {
  id: string;
  userName: string;
  phone: string;
  country: string;
  visaType: string;
  workPeriod: string;
  salary: string;
  estimatedRefund: string;
  feeType: string;
  status: string;
  appliedAt: string;
}

/**
 * 1. Supabase kmarket_tax_refund_leads 테이블에서 실제 신청 리스트 조회
 */
export async function fetchTaxRefundLeads(): Promise<TaxRefundLead[]> {
  if (!isSupabaseConfigured || !supabase) {
    return [];
  }

  try {
    const { data, error } = await supabase
      .from('kmarket_tax_refund_leads')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(100);

    if (error || !data) {
      console.warn('Error fetching tax refund leads:', error?.message);
      return [];
    }

    return data.map((row: any) => {
      const refundNum = typeof row.estimated_refund === 'number'
        ? row.estimated_refund
        : parseInt(row.estimated_refund || '0', 10);
      const salaryNum = typeof row.monthly_salary === 'number'
        ? row.monthly_salary
        : parseInt(row.monthly_salary || '0', 10);

      return {
        id: row.id,
        userName: row.user_name || '익명 신청자',
        phone: row.phone || '-',
        country: row.country || 'KR',
        visaType: row.visa_type || 'E-9',
        workPeriod: `${row.work_period_years || 3}년 (${row.visa_type || 'E-9'})`,
        salary: salaryNum > 0 ? `${(salaryNum / 10000).toLocaleString()}만원` : '미입력',
        estimatedRefund: refundNum > 0 ? `${(refundNum / 10000).toLocaleString()}만원` : '계산 완료',
        feeType: row.fee_type === 'post_payment_15' ? '15% 후불제 (0원 선결제)' : '100% 후불제',
        status: row.status === 'applied' ? '접수 완료 (검토중)' : (row.status || '접수 완료'),
        appliedAt: row.created_at ? new Date(row.created_at).toLocaleString() : new Date().toLocaleDateString(),
      };
    });
  } catch (err) {
    console.warn('Exception in fetchTaxRefundLeads:', err);
    return [];
  }
}
