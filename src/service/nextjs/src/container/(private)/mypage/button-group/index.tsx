import Button from '@/component/button';
import style from '@/style/container/(private)/mypage/button-group/index.module.css';
import { ArticleOutlined, CampaignOutlined, HelpOutline, InfoOutlined } from '@mui/icons-material';

const MyPageButtonGroup = () => {
	return (
		<div className={style.container}>
			<Button>
				<CampaignOutlined />
				<span>공지사항</span>
			</Button>
			<Button>
				<HelpOutline />
				<span>1:1 문의하기</span>
			</Button>
			<Button>
				<InfoOutlined />
				<span>서비스 관리</span>
				<span
					style={{
						fontSize: '4cqw',
						color: '#b2b2b2',
						marginLeft: 'auto',
						textTransform: 'none',
					}}
				>
					v1.0.0
				</span>
			</Button>
			<Button>
				<ArticleOutlined />
				<span>앱 설치 방법 안내</span>
			</Button>
		</div>
	);
};

export default MyPageButtonGroup;
