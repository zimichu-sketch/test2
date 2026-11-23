/**
 * Pokemon GO Battle Hub - Data Store
 * Source: '포켓몬고 패치분석 및 대도각참 평가 설명서.pdf' (Creator: 광명남자)
 */

window.GO_BATTLE_DATA = {
  meta: {
    title: "포켓몬고 배틀리그 차기 패치 분석 & 대도각참 공략 허브",
    subtitle: "PVP 랭커 '광명남자'의 심층 분석 기반 실전 인터랙티브 가이드",
    creator: "광명남자 (PVP 마스터/레전드 3계정 달성)",
    sourceVideo: "https://www.youtube.com/watch?v=2v1L4VgUayw",
    videoLength: "1시간 39분 45초",
    updatedDate: "2026-11-23"
  },

  // 1. Move Balance Patches
  moves: [
    {
      id: "sandsear-storm",
      name: "열사의폭풍 (Sandsear Storm)",
      type: "땅 (Ground)",
      typeColor: "#E0C068",
      status: "buff",
      badge: "대폭 버프",
      changeText: "데미지 +10 파격 상향 (원거리 폭격 강화)",
      summary: "광명남자가 이번 패치 중 가장 파격적이라 평한 항목. 영물 랜드로스의 마스터리그 지배력 확정.",
      beneficiaries: ["랜드로스 (영물폼)"],
      victims: ["디아루가", "자시안", "제크로무", "대도각참 등 땅 약점 몬스터"],
      league: ["마스터리그"],
      screenshot: "assets/screenshots/03_sandsear_storm.png",
      timestamp: "07:15",
      analysis: "이미 볼트로스, 자시안 등을 압박하던 랜드로스가 데미지 10 상향으로 마스터리그 절대 존엄 0티어로 격상되었습니다."
    },
    {
      id: "psystrike",
      name: "사이코브레이크 (Psystrike)",
      type: "에스퍼 (Psychic)",
      typeColor: "#F85888",
      status: "nerf",
      badge: "핵심 너f",
      changeText: "에너지 요구량 증가 (45 → 50+ 추정)",
      summary: "마스터리그 지배자 뮤츠의 초고속 스팸 사이클 억제.",
      beneficiaries: ["에스퍼에 취약했던 일반 격투/독 포켓몬"],
      victims: ["뮤츠 (일반/그림자/메가)"],
      league: ["마스터리그"],
      screenshot: "assets/screenshots/02_nerf_moves.png",
      timestamp: "04:30",
      analysis: "사이코커터 5방 사이클이 6방 이상으로 지연되어, 무지성 쉴드 낚시 및 초고속 연사가 불가능해졌습니다."
    },
    {
      id: "rock-throw",
      name: "돌떨구기 (Rock Throw)",
      type: "바위 (Rock)",
      typeColor: "#B8A038",
      status: "nerf",
      badge: "너프",
      changeText: "데미지 및 에너지 생성 밸런스 하향",
      summary: "슈퍼리그 적폐 멜리시 억제 목적이나, 일반 바위몬까지 억울한 피해.",
      beneficiaries: ["비행/벌레/불꽃 포켓몬"],
      victims: ["멜리시 (슈퍼리그 타격)", "대구리", "암스타"],
      league: ["슈퍼리그", "하이퍼리그"],
      screenshot: "assets/screenshots/02_nerf_moves.png",
      timestamp: "05:10",
      analysis: "멜리시의 평타 압박이 감소했지만, 전기컵 등에서 조커로 쓰이던 일반 바위 포켓몬들까지 큰 타격을 입었습니다."
    },
    {
      id: "triple-axel",
      name: "트리플악셀 (Triple Axel)",
      type: "얼음 (Ice)",
      typeColor: "#98D8D8",
      status: "buff",
      badge: "버프",
      changeText: "에너지 요구량 40으로 감소 (100% 공격 +1랭크 상승 유지)",
      summary: "사기급 랭업 기술의 초고속 발동 가능.",
      beneficiaries: ["눈여아 (눈싸라기 5방 발동)", "프리저", "카포에라", "이어롭"],
      victims: ["드래곤/풀/비행 타입 포켓몬"],
      league: ["슈퍼리그", "하이퍼리그"],
      screenshot: "assets/screenshots/04_triple_axel_crosschop.png",
      timestamp: "12:30",
      analysis: "100% 확률로 공격력을 올려주는 고성능 스킬이 40 에너지로 가벼워져 눈여아와 프리저의 기점 제압력이 극대화되었습니다."
    },
    {
      id: "mud-bomb",
      name: "진흙폭탄 (Mud Bomb)",
      type: "땅 (Ground)",
      typeColor: "#E0C068",
      status: "adjust",
      badge: "조정/간접너프",
      changeText: "에너지 대비 성능 재조정",
      summary: "스톤샤워 하향과 맞물려 가라르 메더의 몰락 초래.",
      beneficiaries: ["강철에 취약했던 전기/바위 포켓몬"],
      victims: ["가라르 메더 (G-Stunfisk)"],
      league: ["슈퍼리그", "하이퍼리그"],
      screenshot: "assets/screenshots/02_nerf_moves.png",
      timestamp: "06:05",
      analysis: "스톤샤워 데미지 하향에 이어 진흙폭탄까지 손질되면서 슈퍼리그 철옹성이던 가라르 메더가 치명상을 입었습니다."
    },
    {
      id: "dig",
      name: "구멍파기 (Dig)",
      type: "땅 (Ground)",
      typeColor: "#E0C068",
      status: "buff",
      badge: "버프",
      changeText: "에너지 소모량 대폭 완화 (실전 사용 가능)",
      summary: "글라이거의 땅 타점 강화 및 실전력 상승.",
      beneficiaries: ["글라이거", "그림자 글라이거"],
      victims: ["전기/강철/독 포켓몬"],
      league: ["슈퍼리그"],
      screenshot: "assets/screenshots/04_triple_axel_crosschop.png",
      timestamp: "14:10",
      analysis: "무겁기 짝이 없던 구멍파기의 에너지가 실전 수준으로 가벼워져 글라이거의 대지 타격력이 대폭 보강되었습니다."
    },
    {
      id: "heat-wave",
      name: "열풍 (Heat Wave)",
      type: "불꽃 (Fire)",
      typeColor: "#F08030",
      status: "buff",
      badge: "버프",
      changeText: "데미지 상향",
      summary: "비행 포켓몬들의 강철 견제 조커 기술로 격상.",
      beneficiaries: ["토게틱", "썬더", "할비롱"],
      victims: ["너트령", "무장조", "메타그로스 등 강철몬"],
      league: ["슈퍼리그", "하이퍼리그"],
      screenshot: "assets/screenshots/04_triple_axel_crosschop.png",
      timestamp: "15:40",
      analysis: "토게틱과 썬더가 강철 카운터를 만났을 때 강력한 한 방 반격을 날릴 수 있는 수단이 생겼습니다."
    },
    {
      id: "cross-chop",
      name: "크로스촙 (Cross Chop)",
      type: "격투 (Fighting)",
      typeColor: "#C03028",
      status: "buff",
      badge: "버프",
      changeText: "데미지 상향 (저에너지 고효율)",
      summary: "괴력몬 상향 및 에레키블의 타점 완성 기여.",
      beneficiaries: ["괴력몬", "에레키블", "엘레브"],
      victims: ["노말/바위/강철/악/얼음 포켓몬"],
      league: ["슈퍼리그", "하이퍼리그", "마스터리그"],
      screenshot: "assets/screenshots/04_triple_axel_crosschop.png",
      timestamp: "16:20",
      analysis: "낮은 에너지로 연속 난사할 수 있는 격투 기술의 위력이 늘어나 대도각참을 비롯한 강철/악 포켓몬들에게 큰 위협이 됩니다."
    }
  ],

  // 2. Pokemon New Moves & Tierboard
  pokemon: [
    {
      name: "랜드로스 (영물폼)",
      nameEn: "Landorus (Therian)",
      tier: "0티어 (S+)",
      league: "마스터리그",
      keyMove: "열사의폭풍 (데미지 +10 상향)",
      role: "지상 최강의 마스터리그 지배자",
      priority: "최우선 1순위 (개체값 100 무조건 50레벨 풀강)",
      tags: ["마스터리그 필수", "대단한기술머신 추천", "0티어 어태커"],
      analysis: "열사의폭풍 위력 +10 상향은 파격적입니다. 자시안, 디아루가, 제크로무, 대도각참 등 마스터리그 주류를 모두 제압할 수 있습니다.",
      screenshot: "assets/screenshots/03_sandsear_storm.png",
      recommended: true
    },
    {
      name: "픽시 (Clefable)",
      nameEn: "Clefable",
      tier: "S티어",
      league: "슈퍼/하이퍼리그",
      keyMove: "매지컬플레임 (신규 습득)",
      role: "강철을 태우는 페어리 & 차기 메가픽시 대비",
      priority: "강력 추천 (고개체 육성 필수)",
      tags: ["메가픽시 대비", "강철 견제", "디버프 유틸"],
      analysis: "픽시의 치명적 한계였던 메타그로스 등 강철 타입에 대한 무력함을 45 에너지의 빠른 매지컬플레임(상대 공 1랭크 하향)으로 완벽 극복했습니다.",
      screenshot: "assets/screenshots/06_clefable_magical_flame.png",
      recommended: true
    },
    {
      name: "에레키블 / 엘레브",
      nameEn: "Electivire / Electabuzz",
      tier: "S-티어",
      league: "슈퍼/하이퍼리그",
      keyMove: "크로스촙 + 안다리걸기 (신규 습득)",
      role: "전기 + 격투 환상의 타점 브레이커",
      priority: "추천 (유리대포형 조커)",
      tags: ["타점 조합 혁신", "실전 진입 성공", "고화력"],
      analysis: "전기 단일 공격에서 벗어나 격투 서브웨폰을 확보하여 물/비행뿐 아니라 강철/노말/바위까지 저격 가능한 완성형 딜러가 되었습니다.",
      screenshot: "assets/screenshots/05_electivire_moves.png",
      recommended: true
    },
    {
      name: "대도각참 (Kingambit)",
      nameEn: "Kingambit",
      tier: "A+티어 (조커)",
      league: "마스터리그",
      keyMove: "속여때리기 + 깜짝베기 / 아이언헤드",
      role: "에스퍼 / 고스트 / 악 전담 저격수",
      priority: "전략적 육성 (마스터리그 조커픽)",
      tags: ["11개 반감", "격투 4배 주의", "타부자고 포지션"],
      analysis: "루나아라, 메가뮤츠Y, 이벨타르를 완벽 봉쇄하지만 격투 4배 및 가이오가/땅에 취약하므로 정밀한 파티 보완이 필요합니다.",
      screenshot: "assets/screenshots/09_kingambit_intro.png",
      recommended: true
    },
    {
      name: "레지락 (Regirock)",
      nameEn: "Regirock",
      tier: "A티어",
      league: "슈퍼/하이퍼/마스터",
      keyMove: "메테오빔 (신규 습득)",
      role: "돌떨구기 너프를 만회하는 120위력 초고화력 피니셔",
      priority: "선택적 육성",
      tags: ["메테오빔", "공격 버프", "바위 탱커"],
      analysis: "돌떨구기 하향의 아쉬움을 위력 120 및 확정 공 1랭업 메테오빔으로 만회하여 한 방 클러치 딜러로 기능합니다.",
      screenshot: "assets/screenshots/07_regirock_meteor_beam.png",
      recommended: false
    },
    {
      name: "모래성이당 & 하리뭉",
      nameEn: "Palossand & Hariyama",
      tier: "B+티어",
      league: "슈퍼/하이퍼리그",
      keyMove: "찬물 (Chilling Water) 습득",
      role: "땅 미러전 승부사 & 공격 디버프 서포터",
      priority: "특수 컵 대비",
      tags: ["찬물 디버프", "머드샷 5초 연사"],
      analysis: "모래성이당은 머드샷을 기반으로 찬물(상대 공 1랭크 하락)을 5초마다 난사하여 땅 미러전 조커로 부상했습니다.",
      screenshot: "assets/screenshots/08_overall_patch_summary.png",
      recommended: false
    }
  ],

  // 3. Kingambit In-Depth Matrix
  kingambit: {
    specs: {
      koreanName: "대도각참",
      englishName: "Kingambit",
      generation: "9세대 (팔데아 지방)",
      types: ["악 (Dark)", "강철 (Steel)"],
      cp50: "CP 4,000+",
      signatureAnimation: "차징기 발동 시 다리를 꼬고 삐딱하게 걸터앉는 카리스마 연출"
    },
    typeEffectiveness: {
      tripleResist: [
        { type: "에스퍼 (Psychic)", multiplier: "0.244x", desc: "뮤츠, 루나아라 완전 바보화" },
        { type: "독 (Poison)", multiplier: "0.244x", desc: "독 공격 사실상 면역" }
      ],
      doubleOrSingleResist: [
        { type: "고스트 (Ghost)", multiplier: "0.625x", desc: "섀도볼 등 주력기 효과적 반감" },
        { type: "악 (Dark)", multiplier: "0.625x", desc: "이벨타르 악의파동 대면 완승" },
        { type: "노말 (Normal)", multiplier: "0.625x", desc: "1배 이하 경감" },
        { type: "비행 (Flying)", multiplier: "0.625x", desc: "브레이브버드 등 방어" },
        { type: "바위 (Rock)", multiplier: "0.625x", desc: "스톤샤워 경감" },
        { type: "벌레 (Bug)", multiplier: "0.625x", desc: "벌레 기술 반감" },
        { type: "강철 (Steel)", multiplier: "0.625x", desc: "메타그로스 등 강철 반감" },
        { type: "풀 (Grass)", multiplier: "0.625x", desc: "하드플랜트 등 반감" },
        { type: "전기 (Electric)", multiplier: "0.625x", desc: "1배 이하 안정 방어" },
        { type: "드래곤 (Dragon)", multiplier: "0.625x", desc: "용의숨결 등 경감" }
      ],
      weaknesses: [
        { type: "격투 (Fighting)", multiplier: "2.56x (4배 약점)", severity: "fatal", desc: "인파이트, 카운터 평타 한두 방에 즉사!" },
        { type: "땅 (Ground)", multiplier: "1.6x (2배 약점)", severity: "danger", desc: "랜드로스 열사의폭풍, 그란돈 지진에 원콤" },
        { type: "불꽃 (Fire)", multiplier: "1.6x (2배 약점)", severity: "danger", desc: "칠색조 성스러운불꽃, 뮤츠Y 화염방사 주의" }
      ]
    },
    matchups: [
      {
        target: "루나아라 (Lunala)",
        result: "완막 (절대 우세)",
        color: "#10B981",
        badge: "HARD COUNTER",
        badgeBg: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
        summary: "에스퍼 3중 반감 + 고스트 반감으로 아무런 피해도 입지 않고 기점 마련.",
        tip: "루나아라가 나오면 대도각참을 내밀어 에너지를 가득 모으고 상대를 압도하세요."
      },
      {
        target: "이벨타르 (Yveltal)",
        result: "완승 (절대 우세)",
        color: "#10B981",
        badge: "HARD COUNTER",
        badgeBg: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
        summary: "악/비행 기술을 모두 반감하며 일방적으로 압도.",
        tip: "악 미러전에서 강철 복합 타입의 축복을 가장 크게 누리는 매치업입니다."
      },
      {
        target: "메가뮤츠Y (Mega Mewtwo Y)",
        result: "유리 (조건부)",
        color: "#3B82F6",
        badge: "ADVANTAGE",
        badgeBg: "bg-blue-500/20 text-blue-400 border-blue-500/30",
        summary: "사이코브레이크/섀도볼 완벽 차단. 단, '화염방사' 채용 시 불꽃 2배 기습 주의.",
        tip: "상대 뮤츠가 화염방사를 장착했는지 여부만 쉴드로 체크하면 승리를 거둘 수 있습니다."
      },
      {
        target: "황혼의 갈기 네크로즈마 (Dusk Mane)",
        result: "우세 (타점 유리)",
        color: "#3B82F6",
        badge: "ADVANTAGE",
        badgeBg: "bg-blue-500/20 text-blue-400 border-blue-500/30",
        summary: "자속 악 기술(깜짝베기)로 황갈의 약점을 정확히 찌름.",
        tip: "황갈의 선샤인스매셔를 대등하게 맞받아치며 쉴드 압박을 가할 수 있습니다."
      },
      {
        target: "자시안 (Zacian)",
        result: "호각 (컨트롤 싸움)",
        color: "#F59E0B",
        badge: "SKILL MATCHUP",
        badgeBg: "bg-amber-500/20 text-amber-400 border-amber-500/30",
        summary: "인파이트(격투 4배) 맞으면 즉사하나, 13턴 CMP 타이밍 싸움으로 역전 가능.",
        tip: "자시안이 인파이트를 채우는 13턴에 맞춰 CMP 동시 발동을 걸어 쉴드를 빼앗거나, 상대 인파이트 후 방어 2랭크 떨어진 틈을 타 평타로 녹이세요!"
      },
      {
        target: "가이오가 (Kyogre)",
        result: "극열세 (순수 체급 밀림)",
        color: "#EF4444",
        badge: "DISADVANTAGE",
        badgeBg: "bg-rose-500/20 text-rose-400 border-rose-500/30",
        summary: "1배 평타인 '폭포오르기'에도 내구가 낮아 피가 쭉쭉 깎여나감.",
        tip: "대도각참의 순수 맷집 한계가 가장 적나라하게 드러나는 상대입니다. 즉시 제크로무로 교체하세요."
      },
      {
        target: "랜드로스 / 그란돈 (Ground)",
        result: "극열세 (원콤 즉사)",
        color: "#EF4444",
        badge: "DISADVANTAGE",
        badgeBg: "bg-rose-500/20 text-rose-400 border-rose-500/30",
        summary: "열사의폭풍 데미지 10 상향 및 지진에 스치면 사망.",
        tip: "땅 타입이 보이면 대도각참을 아끼고 파트너 포켓몬으로 먼저 지워야 합니다."
      },
      {
        target: "격투 포켓몬 (메가뮤츠X, 괴력몬)",
        result: "4배 즉사 (절대 대면 금지)",
        color: "#DC2626",
        badge: "FATAL DANGER",
        badgeBg: "bg-red-500/20 text-red-400 border-red-500/30",
        summary: "카운터 평타 서너 방에 사르르 녹아내림.",
        tip: "격투 기술을 보유한 포켓몬과는 1초도 대면하지 말고 바로 도망쳐야 합니다."
      }
    ],
    partyTeam: {
      name: "광명남자의 마스터리그 4승 달성 파티",
      description: "대도각참의 치명적인 약점(격투 4배, 땅/물)을 완벽히 상쇄하는 삼각 시너지 덱",
      members: [
        {
          name: "메가뮤츠Y",
          role: "선봉 / 화력 어태커",
          type: "에스퍼",
          synergy: "대도각참의 최대 천적인 격투 포켓몬을 사이코브레이크/섀도볼로 원천 박멸"
        },
        {
          name: "제크로무",
          role: "교체 / 땅·물 견제 탱커",
          type: "드래곤 / 전기",
          synergy: "대도각참을 녹이는 가이오가를 전기 기술로 제압하고 불꽃/물 기술을 안정적으로 받아냄"
        },
        {
          name: "대도각참",
          role: "피니셔 / 에스퍼·고스트 저격수",
          type: "악 / 강철",
          synergy: "상대의 루나아라, 메가뮤츠Y, 이벨타르, 황혼의갈기를 클로징 매치에서 완벽 봉쇄"
        }
      ],
      resultProof: "assets/screenshots/13_kingambit_victory_4win.png",
      resultDesc: "최상위권 마스터리그 배틀에서 안정적으로 4승 1패를 거두며 조커로서의 가치 입증"
    }
  },

  // 4. Checklist & Final Action Items
  checklist: [
    { id: "c1", text: "개체값 100 랜드로스(영물폼) 확인 및 50레벨 풀강 자원(사탕XL) 배정", priority: "P0 (최우선)", category: "마스터리그" },
    { id: "c2", text: "대단한기술머신스페셜을 사용하여 랜드로스에 '열사의폭풍' 장착", priority: "P0 (최우선)", category: "마스터리그" },
    { id: "c3", text: "메가픽시 대비 및 강철 저격을 위해 고개체 픽시에 '매지컬플레임' 장착", priority: "P1 (강력 추천)", category: "슈퍼/하이퍼" },
    { id: "c4", text: "에레키블/엘레브에 '크로스촙' 및 '안다리걸기' 세팅 후 조커 기용 테스트", priority: "P1 (강력 추천)", category: "슈퍼/하이퍼" },
    { id: "c5", text: "대도각참 마스터리그 투입 시 가이오가/격투 커버용 제크로무·뮤츠 파티 구성", priority: "P2 (전략적)", category: "마스터리그" },
    { id: "c6", text: "뮤츠(사이코브레이크) 및 가라르 메더의 사이클 지연 고려한 파티 리빌딩", priority: "P2 (주의)", category: "전체" }
  ],

  // 5. Screenshots Gallery with Timeline
  gallery: [
    { file: "assets/screenshots/01_intro_patch_notes.png", title: "차기 시즌 밸런스 패치 내역 공개", time: "02:30", desc: "광명남자 채널의 패치 유출 내역 상세 분석 인트로" },
    { file: "assets/screenshots/02_nerf_moves.png", title: "사이코브레이크 & 돌떨구기 너프", time: "04:30", desc: "뮤츠 스팸 억제 및 멜리시 하향 패치 검토" },
    { file: "assets/screenshots/03_sandsear_storm.png", title: "열사의폭풍 데미지 +10 파격 상향", time: "07:15", desc: "랜드로스(영물폼)의 마스터리그 0티어 등극 분석" },
    { file: "assets/screenshots/04_triple_axel_crosschop.png", title: "트리플악셀 & 크로스촙 상향", time: "12:30", desc: "눈여아, 프리저, 괴력몬의 가치 급상승" },
    { file: "assets/screenshots/05_electivire_moves.png", title: "에레키블 전기+격투 타점 확장", time: "19:40", desc: "크로스촙과 안다리걸기 습득으로 실전 진입" },
    { file: "assets/screenshots/06_clefable_magical_flame.png", title: "픽시 매지컬플레임 추가", time: "30:45", desc: "강철 타입 견제 및 차기 메가픽시 대비 버프" },
    { file: "assets/screenshots/07_regirock_meteor_beam.png", title: "레지락 메테오빔 습득", time: "41:30", desc: "위력 120 초고화력 차징기로 한 방 클러치" },
    { file: "assets/screenshots/08_overall_patch_summary.png", title: "밸런스 패치 총평 및 랜드로스 추천", time: "58:50", desc: "광명남자의 차기 시즌 육성 우선순위 조언" },
    { file: "assets/screenshots/09_kingambit_intro.png", title: "대도각참 스펙 및 타부자고 비교", time: "65:10", desc: "악/강철 타입의 방어 상성과 조커픽 특성 설명" },
    { file: "assets/screenshots/10_kingambit_battle_stance.png", title: "대도각참 실전 등장 및 전용 착석 모션", time: "69:40", desc: "차징기 발동 시 다리를 꼬고 앉는 카리스마 연출" },
    { file: "assets/screenshots/11_kingambit_vs_meta.png", title: "메가뮤츠·제크로무·대도각참 실전 배틀", time: "76:50", desc: "마스터리그 최상위 레이팅 구간 실전 테스트" },
    { file: "assets/screenshots/12_kingambit_pros_cons.png", title: "대도각참의 명확한 한계 분석", time: "91:40", desc: "격투 4배 즉사 및 가이오가 물 평타 취약점 진단" },
    { file: "assets/screenshots/13_kingambit_victory_4win.png", title: "대도각참 파티 4승 달성", time: "97:15", desc: "전략적 조커로 기용하여 마스터리그 4승을 달성한 결과 화면" }
  ]
};
