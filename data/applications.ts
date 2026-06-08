export type ApplicationStatus =
  | 'new'
  | 'reviewing'
  | 'id_check'
  | 'photo_check'
  | 'interview'
  | 'approved'
  | 'sent_back'
  | 'rejected';

export type AccountStatus = 'not_issued' | 'issued' | 'active' | 'suspended' | 'withdrawn';

export interface Application {
  id: string;
  stageName: string;
  age: number;
  areas: string[];
  sns?: string;
  email: string;
  appliedAt: string;
  status: ApplicationStatus;
  notes?: string;
  reviewedAt?: string;
  therapistId?: string;
  account?: {
    loginId?: string;
    status: AccountStatus;
    issuedAt?: string;
    lastLoginAt?: string;
  };
}

export const APPLICATION_STATUS_LABELS: Record<ApplicationStatus, string> = {
  new: '新規申請',
  reviewing: '確認中',
  id_check: '本人確認待ち',
  photo_check: '写真確認待ち',
  interview: '面談予定',
  approved: '審査OK',
  sent_back: '差し戻し',
  rejected: '不承認',
};

export const ACCOUNT_STATUS_LABELS: Record<AccountStatus, string> = {
  not_issued: '未発行',
  issued: '発行済み',
  active: '有効',
  suspended: '停止中',
  withdrawn: '退会',
};

export const dummyApplications: Application[] = [
  {
    id: 'APP-001',
    stageName: '陽（よう）',
    age: 25,
    areas: ['渋谷', '新宿'],
    sns: '@yo_therapy',
    email: 'app001@example.com',
    appliedAt: '2026-06-07T14:23:00',
    status: 'new',
  },
  {
    id: 'APP-002',
    stageName: '蒼空（そら）',
    age: 28,
    areas: ['池袋', '新宿', '高田馬場'],
    email: 'app002@example.com',
    appliedAt: '2026-06-06T09:15:00',
    status: 'reviewing',
    notes: '写真は3枚送付済み。本人確認書類は未提出。',
  },
  {
    id: 'APP-003',
    stageName: '紬（つむぎ）',
    age: 30,
    areas: ['銀座', '六本木', '品川'],
    sns: '@tsumugi_relax',
    email: 'app003@example.com',
    appliedAt: '2026-06-05T16:40:00',
    status: 'id_check',
    notes: '本人確認書類の提出待ち。',
  },
  {
    id: 'APP-004',
    stageName: '奏（かなで）',
    age: 24,
    areas: ['吉祥寺', '三鷹', '立川'],
    email: 'app004@example.com',
    appliedAt: '2026-06-04T11:00:00',
    status: 'photo_check',
    notes: 'プロフ写真4枚確認中。基準を満たしているか審査中。',
  },
  {
    id: 'APP-005',
    stageName: '碧（みどり）',
    age: 27,
    areas: ['上野', '秋葉原', '御茶ノ水'],
    email: 'app005@example.com',
    appliedAt: '2026-06-03T10:30:00',
    status: 'interview',
    notes: '6/10 14:00 オンライン面談予定。',
  },
  {
    id: 'APP-006',
    stageName: '海斗（かいと）',
    age: 29,
    areas: ['渋谷', '恵比寿', '中目黒'],
    sns: '@kaito_relax',
    email: 'app006@example.com',
    appliedAt: '2026-06-01T08:00:00',
    status: 'approved',
    reviewedAt: '2026-06-05T15:00:00',
    therapistId: 'TH-006',
    account: {
      loginId: 'kaito_ura001',
      status: 'active',
      issuedAt: '2026-06-05T15:30:00',
      lastLoginAt: '2026-06-07T10:12:00',
    },
  },
  {
    id: 'APP-007',
    stageName: '颯（そう）',
    age: 23,
    areas: ['池袋'],
    email: 'app007@example.com',
    appliedAt: '2026-05-28T14:00:00',
    status: 'sent_back',
    notes: '写真が基準に達していません。撮り直しをお願いしました。',
    reviewedAt: '2026-06-02T12:00:00',
  },
  {
    id: 'APP-008',
    stageName: '心（こころ）',
    age: 19,
    areas: ['新宿'],
    email: 'app008@example.com',
    appliedAt: '2026-05-25T20:00:00',
    status: 'rejected',
    notes: '年齢確認書類が未成年である可能性あり。申請却下。',
    reviewedAt: '2026-05-27T09:00:00',
  },
];
