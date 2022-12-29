# Build image dựa trên image của node
FROM node:18-alpine

# Tạo một working directory bên trong image để chứa code của ứng dụng bên trong image
WORKDIR /app

# Copy toàn bộ code của ứng dụng vào bên trong workng directory (folder app)
COPY . .

# Thực thi bên trong một câu lệnh bên trong working directory
RUN npm install

# Cho phép quyền thực thi file
RUN chmod +x wait-for

EXPOSE 4000

CMD ["node", "src/index.js"]