FROM registry.cn-hangzhou.aliyuncs.com/tfh/python:3.9

# 设置工作目录
WORKDIR /app

# 复制项目文件
COPY . /app

# 彻底清理并替换为阿里云 Debian Bookworm 源（避免其他版本源干扰）
RUN rm -f /etc/apt/sources.list /etc/apt/sources.list.d/* && \
    echo "deb http://mirrors.aliyun.com/debian/ bookworm main non-free contrib non-free-firmware" > /etc/apt/sources.list && \
    echo "deb-src http://mirrors.aliyun.com/debian/ bookworm main non-free contrib non-free-firmware" >> /etc/apt/sources.list && \
    echo "deb http://mirrors.aliyun.com/debian-security/ bookworm-security main" >> /etc/apt/sources.list && \
    echo "deb-src http://mirrors.aliyun.com/debian-security/ bookworm-security main" >> /etc/apt/sources.list && \
    echo "deb http://mirrors.aliyun.com/debian/ bookworm-updates main non-free contrib non-free-firmware" >> /etc/apt/sources.list && \
    echo "deb-src http://mirrors.aliyun.com/debian/ bookworm-updates main non-free contrib non-free-firmware" >> /etc/apt/sources.list

# 安装Python依赖和其他必要工具
RUN pip install --no-cache-dir -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple && \
    apt update && \
    apt install -y netcat-openbsd && \
    chmod 777 /app/logs/debug.log /app/logs/error.log /app/logs/uWSGI.log && \
    touch /app/logs/debug.log /app/logs/error.log /app/logs/uWSGI.log && \
    chmod 777 /app/scripts/init_data.sh && \
    sed -i 's/\r//' ./start.sh && \
    chmod +x ./start.sh

# 设置 Python 环境变量
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# 暴露端口
EXPOSE 8000

# 启动命令
CMD ["/bin/bash", "-c", "[ ! -f /app/initialized ] && /app/scripts/init_data.sh; /bin/bash /app/start.sh"]
