import { NextResponse } from 'next/server';
import { fetchTaxRefundLeads } from '@/lib/taxRefundLeadService';

// GET /api/tax-leads : Supabase에 접수된 세금 환급 신청 리스트 실시간 반환
export async function GET() {
  try {
    const leads = await fetchTaxRefundLeads();
    return NextResponse.json({ success: true, data: leads });
  } catch (error) {
    console.error('API /api/tax-leads GET error:', error);
    return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
  }
}
