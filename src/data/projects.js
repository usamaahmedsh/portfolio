export const financialPipeline = [
  {
    id: 'ew-analyzer',
    title: 'Elliott Wave Analyzer',
    subtitle: 'Pattern Detection',
    repo: 'https://github.com/usamaahmedsh/elliot-wave-analyzer-usamaahmedsh',
    description:
      'End-to-end market data pipeline that ingests OHLCV data across multiple asset classes and automatically detects Elliott Wave patterns — impulsive 5-wave and corrective 3-wave sequences.',
    details:
      'Per-ticker caching, retries, symbol normalization, and sanity checks make runs repeatable and failures contained. Multi-timeframe support (hourly, daily, weekly) with ensemble scoring combining Fibonacci ratios, rule validation, and complexity metrics. CLI runner and async multiprocessing for large-scale scanning. Ships structured outputs: Parquet, JSON payloads, CSV, and PNG plots.',
    tech: ['Python', 'NumPy', 'Pandas', 'Plotly', 'yfinance', 'asyncio', 'multiprocessing', 'HuggingFace Datasets'],
    input: 'Raw OHLCV Data',
    output: 'Labeled EW Patterns',
    color: '#4F8EF7',
    metrics: [
      { label: 'Asset Classes', value: '10+', sub: 'equities, crypto, ETFs, FX, futures' },
      { label: 'Speed', value: '72s', sub: 'per stock on M4 Pro' },
      { label: 'S&P 500', value: '6.5h', sub: 'full 315-symbol scan' },
      { label: 'History', value: '20yr', sub: 'market data windows' },
    ],
  },
  {
    id: 'synthetic-ewt',
    title: 'Synthetic EW Generator',
    subtitle: 'Bayesian Data Synthesis',
    repo: 'https://github.com/usamaahmedsh/synthetic-data-generator-ewt',
    description:
      'Generates high-quality synthetic Elliott Wave training data via multi-stage Bayesian statistical modeling, producing statistically valid, diverse, and rule-conformant training examples.',
    details:
      'Extracts real pattern statistics, models them with Multivariate Normal distributions and Dirichlet posteriors via PyMC. Four-tier validation pipeline: Elliott Wave rules, Fibonacci proximity, statistical quality, and diversity coverage optimization. Outputs balanced labeled Parquet datasets published to HuggingFace Hub.',
    tech: ['PyMC', 'PyTensor', 'NumPy', 'SciPy', 'Scikit-learn', 'HuggingFace Hub', 'FastParquet'],
    input: 'Real EW Pattern Statistics',
    output: '280K+ Synthetic Records',
    color: '#00D4FF',
    metrics: [
      { label: 'Scale', value: '280K+', sub: 'synthetic wave records' },
      { label: 'Validation', value: '4-tier', sub: 'EW rules, Fibonacci, quality, diversity' },
      { label: 'Method', value: 'Bayesian', sub: 'MVN + Dirichlet posteriors' },
      { label: 'Format', value: 'Parquet', sub: 'published to HuggingFace Hub' },
    ],
  },
  {
    id: 'ew-scorer',
    title: 'Elliott Wave Scorer',
    subtitle: 'XGBoost Classifier · SageMaker',
    repo: 'https://github.com/usamaahmedsh/elliott-wave-scorer',
    description:
      'Binary XGBoost classifier trained on synthetic data to validate Elliott Wave patterns, outputting calibrated probability scores (0–1). Deployed as a production endpoint on AWS SageMaker.',
    details:
      'Fibonacci-based feature engineering over pattern geometry and wave ratios. Cross-validated hyperparameter optimization via Optuna across distributed training with PySpark and Dask. Full MLOps pipeline: training on S3 data → SageMaker endpoint for real-time scoring of candidate wave patterns.',
    tech: ['XGBoost', 'Optuna', 'PySpark', 'Dask', 'AWS SageMaker', 'S3', 'boto3', 'Scikit-learn'],
    input: '280K Synthetic Training Set',
    output: 'Probability Scores (0–1)',
    color: '#8B5CF6',
    metrics: [
      { label: 'Deployment', value: 'AWS', sub: 'SageMaker real-time endpoint' },
      { label: 'Optimizer', value: 'Optuna', sub: 'cross-validated HPO' },
      { label: 'Scale', value: 'Spark', sub: 'PySpark + Dask distributed' },
      { label: 'Output', value: '0–1', sub: 'calibrated probability score' },
    ],
  },
]

export const irPipeline = [
  {
    id: 'synthetic-rag',
    title: 'Synthetic Query Generator',
    subtitle: 'RAG / Search Evaluation',
    repo: 'https://github.com/usamaahmedsh/synthetic-data-langchain-rag',
    description:
      'Topic-aware synthetic query generation pipeline over Wikipedia using BERTopic + local LLaMA. Produces large-scale, high-quality evaluation datasets for measuring retrieval quality and reducing measurement bias.',
    details:
      'Wikipedia corpus building with topic discovery via BERTopic. LLM-based query generation (llama.cpp) with advanced heuristic filtering: entropy analysis, repetition detection, BM25, Jaccard lexical diversity, Sentence-Transformers similarity, and TF-IDF near-duplicate removal. Multi-GPU distributed inference with batching/checkpointing and failure isolation for scale.',
    tech: ['BERTopic', 'llama.cpp', 'Sentence-Transformers', 'BM25', 'PyTorch', 'Scikit-learn', 'LangChain'],
    input: 'Wikipedia Corpus',
    output: '1M+ Filtered Queries',
    color: '#4F8EF7',
    metrics: [
      { label: 'Scale', value: '1M+', sub: 'filtered queries generated' },
      { label: 'Per Topic', value: '100K+', sub: 'queries before filtering' },
      { label: 'Inference', value: 'Multi-GPU', sub: 'distributed llama.cpp' },
      { label: 'Filters', value: '5-stage', sub: 'BM25, Jaccard, ST, TF-IDF, entropy' },
    ],
  },
  {
    id: 'auto-qrels',
    title: 'Auto-Qrels Pipeline',
    subtitle: 'Automated Relevance Judging',
    repo: 'https://github.com/usamaahmedsh/auto-qrels',
    description:
      'Agent-style weak supervision pipeline that generates qrels.tsv and training triples without manual annotation — chaining BM25 retrieval through LLM-based relevance judging.',
    details:
      'Multi-stage pipeline: BM25S → BGE dense reranking → cross-encoder filtering → diversity sampling → vLLM judge. ~2,600 queries/hour with 30–50% SQLite cache hit rates. Optimized vLLM batching cut judging latency from 13s/query to ~2s/query (6.5× speedup). Operationalized on SLURM with sharded workers for million-scale throughput.',
    tech: ['BM25S', 'BGE-base-en-v1.5', 'Cross-Encoder', 'vLLM', 'SLURM', 'SQLite', 'asyncio', 'PyTorch'],
    input: '1M+ Query Pool',
    output: 'qrels.tsv + triples.jsonl',
    color: '#00D4FF',
    metrics: [
      { label: 'Throughput', value: '2.6K', sub: 'queries/hour' },
      { label: 'Latency', value: '13s→2s', sub: '6.5× speedup via vLLM opt.' },
      { label: 'Scale', value: '100K+', sub: 'query-doc judgments' },
      { label: 'Cache', value: '50%', sub: 'SQLite hit rate' },
    ],
  },
  {
    id: 'roberta-reranker',
    title: 'RoBERTa Cross-Encoder',
    subtitle: 'Reranker · Trained on Weak Labels',
    repo: 'https://github.com/usamaahmedsh/roberta-reranker-llm-weaklabels',
    description:
      'Cross-encoder reranking model based on RoBERTa-base, trained on LLM-generated weak labels from the Auto-Qrels pipeline. Scores (query, passage) pairs for second-stage retrieve-then-rerank.',
    details:
      'Completes the full data flywheel: generate queries → auto-judge relevance → train reranker. Incorporated reinforcement learning components during experimentation for ranking improvements via reward signals from retrieval outcomes. Evaluated on standard IR metrics (nDCG@k, MRR@k, Recall@k) on MS MARCO-style reranking. Publicly released on HuggingFace Hub.',
    tech: ['RoBERTa-base', 'HuggingFace Transformers', 'Sentence-Transformers', 'PyTorch', 'bf16', 'SLURM'],
    input: 'Weak Labels + Triples',
    output: 'Reranked Results',
    color: '#8B5CF6',
    metrics: [
      { label: 'Benchmark', value: 'MS MARCO', sub: '8.8M passages' },
      { label: 'Metrics', value: 'nDCG / MRR', sub: 'Recall@k evaluation' },
      { label: 'Released', value: 'HuggingFace', sub: 'public model hub' },
      { label: 'Precision', value: 'bf16', sub: 'HPC-optimized training' },
    ],
  },
  {
    id: 'pilabs',
    title: 'LLM Output Evaluator',
    subtitle: 'Pi Labs · Multi-LLM Grid Search',
    repo: 'https://github.com/usamaahmedsh/pilabs-generate-output',
    description:
      'Multi-LLM evaluation pipeline testing 9 model/parameter combinations for generating versioned technical documentation, revealing a fundamental tension between consensus and quality metrics.',
    details:
      'Grid search across GPT-4o, Claude 3.5, and Llama varying temperature/top_p/max_tokens. Discovered −0.44 to −0.55 negative correlation between consensus metrics and Pi rubric scores — consensus metrics reward diversity while Pi rubrics favor grounded, human-aligned quality. "Goldilocks quadrant" strategy identifies optimal model-parameter combinations.',
    tech: ['OpenAI GPT-4o', 'Claude 3.5 Sonnet', 'Llama', 'Pi Scorer', 'Jupyter Notebook'],
    input: 'Technical Docs v1.2',
    output: 'Scored Outputs + Insights',
    color: '#F59E0B',
    branch: true,
    metrics: [
      { label: 'Models', value: '9', sub: 'GPT-4o, Claude 3.5, Llama combos' },
      { label: 'Correlation', value: '−0.49', sub: 'consensus vs. Pi rubric scores' },
      { label: 'Finding', value: 'Goldilocks', sub: 'quadrant strategy' },
      { label: 'Context', value: 'Pi Labs', sub: 'GenAI internship project' },
    ],
  },
]

export const otherProjects = [
  {
    title: 'Multi-Label Sentiment Classification',
    repo: 'https://github.com/usamaahmedsh/NeuralNets-Project-SentimentAnalysis',
    description:
      'Bidirectional LSTM over RoBERTa embeddings for multi-label sentiment classification. Custom weighted binary cross-entropy loss with per-label class balancing, F1-score early stopping, and ExponentialDecay learning rate scheduling.',
    tech: ['TensorFlow', 'Keras', 'RoBERTa', 'HuggingFace Transformers', 'Bi-LSTM'],
    tags: ['NLP', 'Deep Learning', 'Competition'],
  },
  {
    title: 'Credit Card Fraud Detection',
    repo: 'https://github.com/usamaahmedsh/MachineLearning-Project-CreditCardFraudDetection',
    description:
      'End-to-end ML pipeline for detecting fraudulent transactions on highly imbalanced financial data. Full lifecycle: EDA, feature engineering, model training, and evaluation with class-imbalance strategies.',
    tech: ['Python', 'Scikit-Learn', 'XGBoost', 'Pandas', 'Matplotlib'],
    tags: ['Machine Learning', 'Finance', 'Imbalanced Data'],
  },
  {
    title: 'JPMorgan Case Study',
    repo: 'https://github.com/usamaahmedsh/JPMorgan-CaseStudy',
    description:
      'Quantitative financial analysis and data-driven modeling case study. Statistical analysis of financial data with business insight generation and executive-ready reporting.',
    tech: ['Python', 'Pandas', 'Matplotlib', 'Statistical Analysis'],
    tags: ['Finance', 'Analytics', 'Quantitative'],
  },
  {
    title: 'Messi vs Ronaldo: Career Analytics',
    repo: 'https://github.com/usamaahmedsh/DataVisualization-Project-MessiVsRonaldo',
    description:
      'Interactive data visualization comparing career statistics of two football legends across clubs, seasons, and competitions. Data storytelling through custom chart design.',
    tech: ['Python', 'Plotly', 'Pandas', 'Seaborn'],
    tags: ['Data Visualization', 'Sports Analytics'],
  },
]

export const skills = [
  {
    category: 'Languages',
    items: ['Python', 'SQL', 'R'],
  },
  {
    category: 'Analytics & Experimentation',
    items: [
      'Statistical Hypothesis Testing', 'A/B Testing', 'Causal Inference',
      'Experiment Design', 'Ablation Studies', 'Effect-Size Analysis',
      'Incrementality Measurement', 'Forecasting', 'EDA',
    ],
  },
  {
    category: 'Machine Learning',
    items: [
      'Predictive Modeling', 'Supervised & Unsupervised Learning', 'XGBoost',
      'Scikit-Learn', 'Pandas', 'NumPy', 'Feature Engineering',
      'Anomaly Detection', 'Regression Analysis', 'Bayesian Modeling', 'PyMC',
    ],
  },
  {
    category: 'Deep Learning / NLP',
    items: [
      'PyTorch', 'TensorFlow', 'Keras', 'HuggingFace Transformers',
      'LLM Fine-Tuning', 'Bi-LSTM', 'RoBERTa', 'BERTopic',
      'Synthetic Data Generation', 'Weak Supervision',
    ],
  },
  {
    category: 'Search & Ranking',
    items: [
      'Information Retrieval', 'BM25 / BM25S', 'Dense Retrieval',
      'Semantic Search', 'Cross-Encoder Reranking', 'Query Expansion',
      'RAG', 'nDCG / MRR / Recall@k', 'Neural Ranking',
    ],
  },
  {
    category: 'LLMs & GenAI',
    items: [
      'Prompt Engineering', 'vLLM', 'GPT-4o', 'Claude API',
      'llama.cpp', 'Corpus Synthesis', 'Evaluation Pipelines',
    ],
  },
  {
    category: 'Data & Infrastructure',
    items: [
      'PostgreSQL', 'MySQL', 'MongoDB', 'Google BigQuery',
      'Parquet', 'JSONL', 'HuggingFace Datasets/Hub',
      'AWS SageMaker', 'S3', 'SLURM (HPC)', 'Multi-GPU Inference',
      'asyncio', 'multiprocessing', 'Docker', 'Git',
    ],
  },
  {
    category: 'Visualization & Reporting',
    items: [
      'Matplotlib', 'Seaborn', 'Plotly', 'Power BI', 'Tableau',
      'ggplot2', 'R Markdown / Shiny', 'Executive Dashboards',
    ],
  },
]

export const experience = [
  {
    role: 'Research Assistant',
    org: 'University of Arizona',
    location: 'Tucson, AZ',
    period: 'Jan 2025 – Present',
    bullets: [
      'Conducted applied research on improving logical reasoning in LLMs; synthesized a 30K-example training corpus, designed and fine-tuned models on controlled training distributions, and reported results with reproducible evaluation pipelines.',
      'Designed and executed 6 end-to-end experiments — data collection, corpus synthesis, model training, and evaluation — applying statistical hypothesis testing, effect-size analysis, and ablation studies to drive evidence-based conclusions.',
      'Built reproducible measurement frameworks to track model performance across experiments; surfaced actionable insights and communicated findings for both technical and non-technical audiences.',
    ],
  },
  {
    role: 'GenAI Intern',
    org: 'Pi Labs, Inc.',
    location: 'San Francisco, CA',
    period: 'Oct 2025 – Dec 2025',
    bullets: [
      'Developed and shipped AI-powered search and ranking pipelines integrating BM25, dense retrieval, and query fan-out mechanisms; improved document recall, precision, and ranking relevance at production scale.',
      'Engineered synthetic data generation workflows using GPT-4o and Claude 3.5 to produce 2.17M diverse query–document pairs; benchmarked neural vs. lexical retrieval against the full MS MARCO dataset (8.8M passages) to drive search quality improvements.',
      'Designed offline evaluation frameworks defining IR metrics (F1, recall@k, nDCG) and automating gold-label generation; communicated quality, latency, and cost tradeoffs to non-technical stakeholders, directly influencing production architecture decisions.',
    ],
  },
  {
    role: 'Graduate Teaching Assistant — SQL/NoSQL',
    org: 'University of Arizona',
    location: 'Tucson, AZ',
    period: 'Jan 2025 – May 2025',
    bullets: [
      'Assisted 50+ students in mastering SQL and NoSQL databases covering indexing, query optimization, and data modeling; led 10+ recitation sessions and 20+ office hours.',
      'Graded 100+ assignments on SQL queries, NoSQL schema designs, and ETL processes; mentored students on CAP theorem, data consistency models, and scalability strategies.',
    ],
  },
  {
    role: 'Data Scientist II — Applied AI',
    org: 'Afiniti Software Solutions',
    location: 'Washington, D.C.',
    period: 'Nov 2022 – Dec 2023',
    bullets: [
      'Owned integrity measurement and operational decisioning for enterprise clients (Bouygues Telecom, Telefónica) by building predictive models on 3M+ call volume data, driving a $5M/month uplift in customer retention.',
      'Built KPI instrumentation and incrementality measurement against baseline/control policies; identified model gaps through quantitative analysis and drove incremental lift from 17 to 33 cents per dollar.',
      'Developed actor-level monitoring systems to detect anomalous behavior patterns across 400K+ entities; designed sampling strategies and prevalence estimation to quantify harm rates with confidence intervals, informing policy prioritization.',
      'Designed real-time monitoring and alerting for model health, drift detection, and business outcome regressions using PostgreSQL, Python, and R; delivered executive-facing Power BI dashboards communicating technical results to senior leadership.',
    ],
  },
  {
    role: 'Data Science Product Manager',
    org: 'CarFirst',
    location: 'Lahore, PK',
    period: 'Nov 2021 – Aug 2022',
    bullets: [
      'Designed and conducted a hypothesis-driven experiment on 10K+ vehicle auctions to test regression-based assignment; built a Bayesian probabilistic classification system that boosted auction success rate by 20% and predicted a 3% revenue increase.',
      'Delivered recurring data-driven insights and self-service reporting to senior leadership, informing product prioritization and preventing a PKR 40 million loss through quantitative harm mitigation.',
    ],
  },
]

export const education = [
  {
    degree: 'Master of Science — Data Science',
    school: 'University of Arizona',
    location: 'Tucson, US',
    period: 'Jan 2024 – May 2025',
    awards: "Presidential Scholar · Dean's Honor List 2025",
  },
  {
    degree: 'Bachelor of Science — Economics & Mathematics',
    school: 'Lahore University of Management Sciences',
    location: 'Lahore, Pakistan',
    period: 'Aug 2017 – Jan 2022',
    awards: "Dean's Honor List 2021",
  },
]
