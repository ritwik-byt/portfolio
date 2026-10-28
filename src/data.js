// All page content lives here. Edit this file to update projects, milestones and skills.

export const featured = [
  {
    code: 'MDL',
    name: 'Cloud E-Commerce Medallion Data Lakehouse',
    year: '2026',
    status: 'live',
    statusText: 'Production',
    tagline: '3-tier AWS & Databricks lakehouse processing 560K+ records with 79% storage compression.',
    desc: 'Architected a production-grade 3-tier Medallion (Bronze/Silver/Gold) lakehouse ingesting 560K+ transactional e-commerce records and live foreign exchange rates into Amazon S3. Built distributed PySpark jobs in Databricks to clean data, eliminate 10K+ duplicates, and convert raw CSVs into date-partitioned Snappy Parquet.',
    stack: ['PySpark', 'Databricks', 'Amazon S3', 'AWS Athena', 'Apache Airflow', 'Star Schema', 'SCD Type 2', 'Streamlit', 'Plotly'],
    notes: [
      '79% S3 storage footprint reduction and 99% Amazon Athena query scan cost reduction through Snappy Parquet columnar conversion and partition pruning.',
      'Modeled curated Gold-layer data into a Star Schema with multi-currency fact tables (fact_orders), product dimensions, and SCD Type 2 customer dimensions.',
      'Orchestrated end-to-end daily incremental batch workflows using Apache Airflow DAGs with least-privilege AWS IAM policies.',
      'Deployed an interactive Streamlit executive analytics app streaming curated Parquet tables directly from Amazon S3.'
    ],
    live: 'https://ecommerce-lakehouse-ahdfgrhrsgvv8u4hn4z7sn.streamlit.app/',
    repo: 'https://github.com/ritwik-byt/ecommerce-lakehouse',
    shot: './work/lakehouse.webp'
  },
  {
    code: 'ATQ',
    name: 'Algorithmic Trading & Quantitative Analytics Pipeline',
    year: '2026',
    status: 'live',
    statusText: 'Live',
    tagline: 'Automated financial ETL processing 7,000+ market records into MySQL with quantitative metrics.',
    desc: 'Built an automated Python ETL pipeline using Pandas to ingest, normalize, and load 7,000+ historical stock market records into a relational MySQL database. Designed schema structures and SQL queries to compute key quantitative indicators including Daily Returns and 30-Day Volatility.',
    stack: ['Python', 'Pandas', 'MySQL', 'SQL Window Functions', 'Streamlit', 'Plotly', 'Render'],
    notes: [
      'Automated batch ingestion and schema validation for 7,000+ historical stock market records with zero data drift.',
      'Advanced SQL Window Functions, CTEs, and cumulative aggregations to compute rolling volatility and risk metrics.',
      'Interactive Streamlit quantitative dashboard enabling real-time filtering, metric distribution, and trend discovery.'
    ],
    live: 'https://trading-analytics-dashboard-bw5o.onrender.com',
    repo: 'https://github.com/ritwik-byt/algorithmic-trading-pipeline',
    shot: './work/trading.webp'
  }
];

export const more = [
  {
    code: 'FXE',
    name: 'Multi-Currency Live FX Ingestion Engine',
    year: '2026',
    status: 'live',
    statusText: 'Pipeline',
    desc: 'Real-time REST API foreign exchange ingestion service feeding multi-currency rate snapshots into S3 Bronze storage for Lakehouse currency normalization.',
    stack: ['Python', 'REST APIs', 'Amazon S3', 'Requests'],
    live: 'https://ecommerce-lakehouse-ahdfgrhrsgvv8u4hn4z7sn.streamlit.app/',
    repo: 'https://github.com/ritwik-byt/ecommerce-lakehouse'
  },
  {
    code: 'SEC',
    name: 'AWS Least-Privilege IAM & Airflow DAG Orchestration',
    year: '2025–26',
    status: 'live',
    statusText: 'Security',
    desc: 'Custom IAM role definitions and bucket policy configurations restricting Airflow workers and Databricks clusters strictly to project-scoped S3 resource actions.',
    stack: ['AWS IAM', 'Apache Airflow', 'Amazon S3', 'CloudWatch'],
    live: 'https://ecommerce-lakehouse-ahdfgrhrsgvv8u4hn4z7sn.streamlit.app/',
    repo: 'https://github.com/ritwik-byt/ecommerce-lakehouse'
  },
  {
    code: 'QNT',
    name: 'Quantitative Risk & 30-Day Volatility Screener',
    year: '2025',
    status: 'live',
    statusText: 'Analytics',
    desc: 'Statistical stock screener computing historical distributions, Sharpe ratios, rolling standard deviation, and drawdown analytics using Pandas and Plotly.',
    stack: ['Python', 'NumPy', 'Matplotlib', 'Pandas', 'Streamlit'],
    live: 'https://trading-analytics-dashboard-bw5o.onrender.com',
    repo: 'https://github.com/ritwik-byt/algorithmic-trading-pipeline'
  },
  {
    code: 'SQL',
    name: 'LeetCode Advanced SQL & Analytical Query Solutions',
    year: '2025–26',
    status: 'live',
    statusText: 'Practice',
    desc: 'Curated repository of optimized SQL solutions solving complex Window Functions, self-joins, CTE hierarchies, and performance tuning challenges on LeetCode.',
    stack: ['SQL', 'MySQL', 'LeetCode', 'Algorithms'],
    live: 'https://leetcode.com/u/AlaRitwik/',
    repo: 'https://github.com/ritwik-byt'
  }
];

// f = position of the pipeline checkpoint along the track path (0–1)
export const milestones = [
  {
    f: 0.115,
    corner: 'Stage 01 · Foundations',
    when: '2021',
    title: 'Dr. KKR’s Gowtham School, Vijayawada',
    text: 'Completed CBSE Class X with 91.6%, developing a strong analytical foundation in mathematics, logic, and computing.'
  },
  {
    f: 0.22,
    corner: 'Stage 02 · Pre-University',
    when: '2021 – 2023',
    title: 'Dr. KKR’s Happy Valley School',
    text: 'Graduated CBSE Class XII with 84.4%, specializing in higher mathematics and computer science fundamentals.'
  },
  {
    f: 0.35,
    corner: 'Stage 03 · Academic Core',
    when: '2023 – Present',
    title: 'VIT-AP University · B.Tech Data Analytics',
    text: 'Enrolled in Computer Science & Engineering with Data Analytics specialization. Maintaining a high 8.68 / 10 CGPA.'
  },
  {
    f: 0.48,
    corner: 'Stage 04 · Cloud Primitives',
    when: '2024',
    title: 'AWS Academy Graduate · Cloud Foundations',
    text: 'Mastered AWS cloud architecture, object storage (S3), IAM permissions, and core compute infrastructure.'
  },
  {
    f: 0.60,
    corner: 'Stage 05 · Cloud Architecture',
    when: '2024',
    title: 'AWS Academy Graduate · Cloud Architecting',
    text: 'Designed scalable, fault-tolerant cloud architectures with decoupling, partitioning, and security best practices.'
  },
  {
    f: 0.72,
    corner: 'Stage 06 · Financial ETL Pipeline',
    when: '2025',
    title: 'Algorithmic Trading & Analytics Engine',
    text: 'Processed 7,000+ historical stock market records into MySQL with SQL Window Functions and Streamlit dashboard.'
  },
  {
    f: 0.85,
    corner: 'Stage 07 · Professional Credential',
    when: '2025',
    title: 'AWS Certified Data Engineer – Associate',
    text: 'Achieved industry-recognized AWS certification validating deep expertise in data lakes, ETL pipelines, and Athena/S3 optimization.'
  },
  {
    f: 0.95,
    corner: 'Stage 08 · Production Scale',
    when: '2026',
    title: 'Cloud E-Commerce Medallion Lakehouse',
    text: 'Shipped an enterprise 3-tier lakehouse processing 560,000+ records with PySpark, Databricks, and 79% Parquet storage reduction.'
  }
];

// Capabilities, read as the 4 systems of a modern Data Lakehouse Architecture
export const setup = [
  {
    part: 'compute',
    label: 'Big Data & Distributed Compute',
    title: 'PySpark & Engine',
    line: 'Distributed engines that clean, deduplicate, and transform high-throughput data streams.',
    items: [
      ['PySpark / Spark', 'Distributed DataFrames'],
      ['Databricks', 'Managed Clusters & Notebooks'],
      ['Apache Airflow', 'DAG Workflow Orchestration'],
      ['Snappy Parquet', 'Columnar File Optimization'],
      ['Medallion Architecture', 'Bronze · Silver · Gold']
    ]
  },
  {
    part: 'storage',
    label: 'Cloud & Object Storage',
    title: 'AWS Data Lake',
    line: 'Scalable cloud infrastructure where petabyte-scale data rests securely and queries run cheap.',
    items: [
      ['Amazon S3', 'Tiered Lakehouse Storage'],
      ['AWS Athena', 'Presto Serverless SQL'],
      ['AWS IAM', 'Least-Privilege Bucket Policies'],
      ['Partition Pruning', 'Date & Region Hive Partitioning'],
      ['CloudWatch', 'Cluster Health & Alerting']
    ]
  },
  {
    part: 'modeling',
    label: 'Databases & Schema Design',
    title: 'Data Modeling',
    line: 'Analytical architectures structured for fast BI querying and history tracking.',
    items: [
      ['Star Schema', 'Fact & Dimension Tables'],
      ['SCD Type 2', 'Historical Dimension Tracking'],
      ['MySQL', 'Relational OLTP Database'],
      ['Advanced SQL', 'Window Functions & CTEs'],
      ['Schema Enforcement', 'Zero Null / Corrupt Drift']
    ]
  },
  {
    part: 'analytics',
    label: 'Analytics, APIs & Visualization',
    title: 'Serving Layer',
    line: 'Executive dashboards and clean interfaces that turn raw numbers into business insights.',
    items: [
      ['Python', 'Pandas · NumPy'],
      ['Streamlit', 'Interactive Analytics Apps'],
      ['Plotly', 'High-Speed Visualization'],
      ['Java & Spring Boot', 'REST API Catalogs'],
      ['Render / Cloud', 'Live Production Deployments']
    ]
  }
];
