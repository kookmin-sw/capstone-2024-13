import Button from '@/component/button';
import style from '@/style/container/(private)/mypage/button-group/index.module.css';
import { ArticleOutlined, CampaignOutlined, HelpOutline, InfoOutlined } from '@mui/icons-material';
import Link from 'next/link';

const MyPageButtonGroup = () => {
	return (
		<div className={style.container}>
			<Button className={style.button}>
				<CampaignOutlined />
				<span>공지사항</span>
			</Button>
			<Button className={style.button}>
				<HelpOutline />
				<span>1:1 문의하기</span>
			</Button>
			<Button className={style.button}>
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
			<Button style={{ width: '100cqw', height: '20cqw', display: 'flex', alignItems: 'center' }}>
				<Link
					href={'https://tranquil-wrist-5ef.notion.site/PWA-22e34d7c9784409bbf463aca43c6b68a?pvs=4'}
					passHref
					className={style.button}
				>
					<ArticleOutlined />
					<span>앱 설치 방법 안내</span>
				</Link>
			</Button>
		</div>
	);
};

export default MyPageButtonGroup;
