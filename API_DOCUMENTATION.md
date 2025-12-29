# RelowFlow API - Documentação de Endpoints

## Base URL
```
http://localhost:5219/api
```

## Autenticação
Todos os endpoints (exceto `/api/auth/*`) requerem autenticação via JWT Token.

**Header necessário:**
```
Authorization: {token}
```

---

## 1. Autenticação (Auth)

### 1.1. Login
**Endpoint:** `POST /api/auth/signin`  
**Autenticação:** Não requerida

**Payload:**
```json
{
  "email": "usuario@example.com",
  "password": "senha123"
}
```

**Resposta de Sucesso (200):**
```json
{
  "success": true,
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "sub": "550e8400-e29b-41d4-a716-446655440000",
    "email": "usuario@example.com",
    "name": "João Silva"
  }
}
```

**Resposta de Erro (400):**
```json
{
  "success": false,
  "message": "Email ou senha inválidos",
  "errors": []
}
```

---

### 1.2. Cadastro
**Endpoint:** `POST /api/auth/signup`  
**Autenticação:** Não requerida

**Payload:**
```json
{
  "firstName": "João",
  "lastName": "Silva",
  "email": "usuario@example.com",
  "password": "senha123"
}
```

**Resposta de Sucesso (201):**
```json
{
  "success": true,
  "data": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "firstName": "João",
    "lastName": "Silva",
    "email": "usuario@example.com",
    "gender": null,
    "nif": null,
    "niss": null,
    "registerNumber": null,
    "nacionalidad": null,
    "naturalidad": null,
    "profession": null,
    "salary": null,
    "zipCode": null,
    "streetAddress": null,
    "streetAddressNumber": null,
    "streetAddressComplement": null,
    "city": null,
    "state": null,
    "country": null,
    "passportNumber": null,
    "passportCreated": null,
    "passportExpires": null,
    "hasVisa": false,
    "visaStartDate": null,
    "visaEndDate": null,
    "anotherInformation": null,
    "resetPassword": false,
    "lastLogin": null,
    "status": 0,
    "createdAt": "2024-12-29T19:00:00Z",
    "updatedAt": "2024-12-29T19:00:00Z"
  }
}
```

**Resposta de Erro (400):**
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "property": "Email",
      "message": "Email já está em uso"
    }
  ]
}
```

---

## 2. Usuários (User)

### 2.1. Listar Todos os Usuários
**Endpoint:** `GET /api/user`  
**Autenticação:** Requerida

**Resposta de Sucesso (200):**
```json
{
  "success": true,
  "data": [
    {
      "id": "550e8400-e29b-41d4-a716-446655440000",
      "firstName": "João",
      "lastName": "Silva",
      "email": "usuario@example.com",
      "gender": 0,
      "nif": "123456789",
      "niss": null,
      "registerNumber": null,
      "nacionalidad": "Brasileira",
      "naturalidad": null,
      "profession": "Desenvolvedor",
      "salary": 5000.00,
      "zipCode": "12345-678",
      "streetAddress": "Rua Exemplo",
      "streetAddressNumber": "123",
      "streetAddressComplement": "Apto 45",
      "city": "São Paulo",
      "state": "SP",
      "country": "Brasil",
      "passportNumber": null,
      "passportCreated": null,
      "passportExpires": null,
      "hasVisa": false,
      "visaStartDate": null,
      "visaEndDate": null,
      "anotherInformation": null,
      "resetPassword": false,
      "lastLogin": "2024-12-29T18:00:00Z",
      "status": 0,
      "createdAt": "2024-12-29T19:00:00Z",
      "updatedAt": "2024-12-29T19:00:00Z"
    }
  ]
}
```

**Resposta de Erro (401):**
```json
{
  "success": false,
  "message": "Unauthorized"
}
```

---

## 3. Empresas (Company)

### 3.1. Listar Todas as Empresas
**Endpoint:** `GET /api/company`  
**Autenticação:** Requerida

**Resposta de Sucesso (200):**
```json
{
  "success": true,
  "data": [
    {
      "id": "550e8400-e29b-41d4-a716-446655440000",
      "userId": "660e8400-e29b-41d4-a716-446655440000",
      "name": "Europei Solutions",
      "description": "Empresa de Relocation",
      "financialCode": "EUR001",
      "users": [
        {
          "id": "770e8400-e29b-41d4-a716-446655440000",
          "companyId": "550e8400-e29b-41d4-a716-446655440000",
          "userId": "880e8400-e29b-41d4-a716-446655440000",
          "created": "2024-12-29T19:00:00Z",
          "updated": "2024-12-29T19:00:00Z",
          "deleted": null
        }
      ],
      "created": "2024-12-29T19:00:00Z",
      "updated": "2024-12-29T19:00:00Z",
      "deleted": null,
      "positions": [
        {
          "id": "990e8400-e29b-41d4-a716-446655440000",
          "companyId": "550e8400-e29b-41d4-a716-446655440000",
          "name": "Captação de lead",
          "documentTemplates": [
            {
              "id": "aa0e8400-e29b-41d4-a716-446655440000",
              "companyPositionId": "990e8400-e29b-41d4-a716-446655440000",
              "name": "Passaporte",
              "documentType": "PASSPORT",
              "isRequired": true,
              "targetType": 0,
              "created": "2024-12-29T19:00:00Z",
              "updated": "2024-12-29T19:00:00Z",
              "deleted": null
            }
          ],
          "created": "2024-12-29T19:00:00Z",
          "updated": "2024-12-29T19:00:00Z",
          "deleted": null
        }
      ]
    }
  ]
}
```

**Resposta de Erro (401):**
```json
{
  "success": false,
  "message": "Unauthorized"
}
```

---

### 3.2. Criar Empresa
**Endpoint:** `POST /api/company`  
**Autenticação:** Requerida

**Payload:**
```json
{
  "name": "Europei Solutions",
  "description": "Empresa de Relocation"
}
```

**Resposta de Sucesso (201):**
```json
{
  "success": true,
  "data": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "userId": "660e8400-e29b-41d4-a716-446655440000",
    "name": "Europei Solutions",
    "description": "Empresa de Relocation",
    "financialCode": "EUR001",
    "users": [],
    "created": "2024-12-29T19:00:00Z",
    "updated": "2024-12-29T19:00:00Z",
    "deleted": null,
    "positions": [
      {
        "id": "990e8400-e29b-41d4-a716-446655440000",
        "companyId": "550e8400-e29b-41d4-a716-446655440000",
        "name": "Captação de lead",
        "documentTemplates": [],
        "created": "2024-12-29T19:00:00Z",
        "updated": "2024-12-29T19:00:00Z",
        "deleted": null
      }
    ]
  }
}
```

**Resposta de Erro (400):**
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "property": "Name",
      "message": "Nome é obrigatório"
    }
  ]
}
```

---

## 4. Leads

### 4.1. Listar Leads por Empresa
**Endpoint:** `GET /api/lead/company/{companyId}`  
**Autenticação:** Requerida

**Parâmetros:**
- `companyId` (Guid) - ID da empresa

**Resposta de Sucesso (200):**
```json
{
  "success": true,
  "data": [
    {
      "id": "550e8400-e29b-41d4-a716-446655440000",
      "userId": "660e8400-e29b-41d4-a716-446655440000",
      "companyId": "770e8400-e29b-41d4-a716-446655440000",
      "companyPositionId": "880e8400-e29b-41d4-a716-446655440000",
      "name": "Luiz e Cintia",
      "description": "Família com 2 filhos",
      "amount": 50000.00,
      "currency": "EUR",
      "zipCode": "12345-678",
      "streetAddress": "Rua Exemplo",
      "streetAddressNumber": "123",
      "streetAddressComplement": "Apto 45",
      "city": "Lisboa",
      "state": null,
      "country": "Portugal",
      "members": [
        {
          "id": "990e8400-e29b-41d4-a716-446655440000",
          "leadId": "550e8400-e29b-41d4-a716-446655440000",
          "userId": "aa0e8400-e29b-41d4-a716-446655440000",
          "name": null,
          "created": "2024-12-29T19:00:00Z",
          "updated": "2024-12-29T19:00:00Z",
          "deleted": null
        },
        {
          "id": "bb0e8400-e29b-41d4-a716-446655440000",
          "leadId": "550e8400-e29b-41d4-a716-446655440000",
          "userId": null,
          "name": "Filho 1",
          "created": "2024-12-29T19:00:00Z",
          "updated": "2024-12-29T19:00:00Z",
          "deleted": null
        }
      ],
      "created": "2024-12-29T19:00:00Z",
      "updated": "2024-12-29T19:00:00Z",
      "deleted": null
    }
  ]
}
```

**Resposta de Erro (401):**
```json
{
  "success": false,
  "message": "Unauthorized"
}
```

---

### 4.2. Buscar Lead por ID
**Endpoint:** `GET /api/lead/{id}`  
**Autenticação:** Requerida

**Parâmetros:**
- `id` (Guid) - ID do lead

**Resposta de Sucesso (200):**
```json
{
  "success": true,
  "data": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "userId": "660e8400-e29b-41d4-a716-446655440000",
    "companyId": "770e8400-e29b-41d4-a716-446655440000",
    "companyPositionId": "880e8400-e29b-41d4-a716-446655440000",
    "name": "Luiz e Cintia",
    "description": "Família com 2 filhos",
    "amount": 50000.00,
    "currency": "EUR",
    "zipCode": "12345-678",
    "streetAddress": "Rua Exemplo",
    "streetAddressNumber": "123",
    "streetAddressComplement": "Apto 45",
    "city": "Lisboa",
    "state": null,
    "country": "Portugal",
    "members": [],
    "created": "2024-12-29T19:00:00Z",
    "updated": "2024-12-29T19:00:00Z",
    "deleted": null
  }
}
```

**Resposta de Erro (404):**
```json
{
  "success": false,
  "message": "Lead not found"
}
```

---

### 4.3. Criar Lead
**Endpoint:** `POST /api/lead`  
**Autenticação:** Requerida

**Payload:**
```json
{
  "companyId": "770e8400-e29b-41d4-a716-446655440000",
  "companyPositionId": "880e8400-e29b-41d4-a716-446655440000",
  "name": "Luiz e Cintia",
  "description": "Família com 2 filhos"
}
```

**Resposta de Sucesso (201):**
```json
{
  "success": true,
  "data": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "userId": "660e8400-e29b-41d4-a716-446655440000",
    "companyId": "770e8400-e29b-41d4-a716-446655440000",
    "companyPositionId": "880e8400-e29b-41d4-a716-446655440000",
    "name": "Luiz e Cintia",
    "description": "Família com 2 filhos",
    "amount": null,
    "currency": "EUR",
    "zipCode": null,
    "streetAddress": null,
    "streetAddressNumber": null,
    "streetAddressComplement": null,
    "city": null,
    "state": null,
    "country": null,
    "members": [],
    "created": "2024-12-29T19:00:00Z",
    "updated": "2024-12-29T19:00:00Z",
    "deleted": null
  }
}
```

**Resposta de Erro (400):**
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "property": "Name",
      "message": "Nome é obrigatório"
    }
  ]
}
```

---

### 4.4. Atualizar Lead
**Endpoint:** `PUT /api/lead/{id}`  
**Autenticação:** Requerida

**Parâmetros:**
- `id` (Guid) - ID do lead

**Payload:**
```json
{
  "name": "Luiz e Cintia - Atualizado",
  "description": "Família com 2 filhos atualizada",
  "amount": 55000.00,
  "currency": "EUR",
  "zipCode": "12345-678",
  "streetAddress": "Rua Exemplo Atualizada",
  "streetAddressNumber": "456",
  "streetAddressComplement": "Apto 50",
  "city": "Porto",
  "state": null,
  "country": "Portugal",
  "companyId": "770e8400-e29b-41d4-a716-446655440000",
  "companyPositionId": "880e8400-e29b-41d4-a716-446655440000"
}
```

**Resposta de Sucesso (200):**
```json
{
  "success": true,
  "data": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "userId": "660e8400-e29b-41d4-a716-446655440000",
    "companyId": "770e8400-e29b-41d4-a716-446655440000",
    "companyPositionId": "880e8400-e29b-41d4-a716-446655440000",
    "name": "Luiz e Cintia - Atualizado",
    "description": "Família com 2 filhos atualizada",
    "amount": 55000.00,
    "currency": "EUR",
    "zipCode": "12345-678",
    "streetAddress": "Rua Exemplo Atualizada",
    "streetAddressNumber": "456",
    "streetAddressComplement": "Apto 50",
    "city": "Porto",
    "state": null,
    "country": "Portugal",
    "members": [],
    "created": "2024-12-29T19:00:00Z",
    "updated": "2024-12-29T20:00:00Z",
    "deleted": null
  }
}
```

**Resposta de Erro (404):**
```json
{
  "success": false,
  "message": "Lead with Id 550e8400-e29b-41d4-a716-446655440000 not found"
}
```

---

### 4.5. Deletar Lead
**Endpoint:** `DELETE /api/lead/{id}`  
**Autenticação:** Requerida

**Parâmetros:**
- `id` (Guid) - ID do lead

**Resposta de Sucesso (200):**
```json
{
  "success": true,
  "data": {
    "success": true
  }
}
```

**Resposta de Erro (404):**
```json
{
  "success": false,
  "message": "Lead with Id 550e8400-e29b-41d4-a716-446655440000 not found"
}
```

---

### 4.6. Atualizar Posição do Lead (Kanban)
**Endpoint:** `PATCH /api/lead/{id}/position`  
**Autenticação:** Requerida

**Parâmetros:**
- `id` (Guid) - ID do lead

**Payload:**
```json
{
  "companyPositionId": "880e8400-e29b-41d4-a716-446655440000"
}
```

**Resposta de Sucesso (200):**
```json
{
  "success": true,
  "data": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "userId": "660e8400-e29b-41d4-a716-446655440000",
    "companyId": "770e8400-e29b-41d4-a716-446655440000",
    "companyPositionId": "880e8400-e29b-41d4-a716-446655440000",
    "name": "Luiz e Cintia",
    "description": "Família com 2 filhos",
    "amount": 50000.00,
    "currency": "EUR",
    "zipCode": null,
    "streetAddress": null,
    "streetAddressNumber": null,
    "streetAddressComplement": null,
    "city": null,
    "state": null,
    "country": null,
    "members": [],
    "created": "2024-12-29T19:00:00Z",
    "updated": "2024-12-29T20:00:00Z",
    "deleted": null
  }
}
```

**Resposta de Erro (404):**
```json
{
  "success": false,
  "message": "Lead with Id 550e8400-e29b-41d4-a716-446655440000 not found"
}
```

---

## 5. Membros do Lead (LeadMember)

### 5.1. Listar Membros do Lead
**Endpoint:** `GET /api/leadmember/lead/{leadId}`  
**Autenticação:** Requerida

**Parâmetros:**
- `leadId` (Guid) - ID do lead

**Resposta de Sucesso (200):**
```json
{
  "success": true,
  "data": [
    {
      "id": "550e8400-e29b-41d4-a716-446655440000",
      "leadId": "660e8400-e29b-41d4-a716-446655440000",
      "userId": "770e8400-e29b-41d4-a716-446655440000",
      "name": null,
      "created": "2024-12-29T19:00:00Z",
      "updated": "2024-12-29T19:00:00Z",
      "deleted": null
    },
    {
      "id": "880e8400-e29b-41d4-a716-446655440000",
      "leadId": "660e8400-e29b-41d4-a716-446655440000",
      "userId": null,
      "name": "Filho 1",
      "created": "2024-12-29T19:00:00Z",
      "updated": "2024-12-29T19:00:00Z",
      "deleted": null
    }
  ]
}
```

**Resposta de Erro (401):**
```json
{
  "success": false,
  "message": "Unauthorized"
}
```

---

### 5.2. Buscar Membro por ID
**Endpoint:** `GET /api/leadmember/{id}`  
**Autenticação:** Requerida

**Parâmetros:**
- `id` (Guid) - ID do membro

**Resposta de Sucesso (200):**
```json
{
  "success": true,
  "data": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "leadId": "660e8400-e29b-41d4-a716-446655440000",
    "userId": "770e8400-e29b-41d4-a716-446655440000",
    "name": null,
    "created": "2024-12-29T19:00:00Z",
    "updated": "2024-12-29T19:00:00Z",
    "deleted": null
  }
}
```

**Resposta de Erro (404):**
```json
{
  "success": false,
  "message": "Lead Member not found"
}
```

---

### 5.3. Criar Membro do Lead
**Endpoint:** `POST /api/leadmember`  
**Autenticação:** Requerida

**Payload:**
```json
{
  "leadId": "660e8400-e29b-41d4-a716-446655440000",
  "userId": "770e8400-e29b-41d4-a716-446655440000",
  "name": null
}
```

**Ou para membro sem usuário:**
```json
{
  "leadId": "660e8400-e29b-41d4-a716-446655440000",
  "userId": null,
  "name": "Filho 1"
}
```

**Resposta de Sucesso (201):**
```json
{
  "success": true,
  "data": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "leadId": "660e8400-e29b-41d4-a716-446655440000",
    "userId": "770e8400-e29b-41d4-a716-446655440000",
    "name": null,
    "created": "2024-12-29T19:00:00Z",
    "updated": "2024-12-29T19:00:00Z",
    "deleted": null
  }
}
```

**Resposta de Erro (400):**
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "property": "LeadId",
      "message": "LeadId é obrigatório"
    }
  ]
}
```

---

### 5.4. Atualizar Membro do Lead
**Endpoint:** `PUT /api/leadmember/{id}`  
**Autenticação:** Requerida

**Parâmetros:**
- `id` (Guid) - ID do membro

**Payload:**
```json
{
  "userId": "770e8400-e29b-41d4-a716-446655440000",
  "name": "Nome Atualizado"
}
```

**Resposta de Sucesso (200):**
```json
{
  "success": true,
  "data": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "leadId": "660e8400-e29b-41d4-a716-446655440000",
    "userId": "770e8400-e29b-41d4-a716-446655440000",
    "name": "Nome Atualizado",
    "created": "2024-12-29T19:00:00Z",
    "updated": "2024-12-29T20:00:00Z",
    "deleted": null
  }
}
```

**Resposta de Erro (404):**
```json
{
  "success": false,
  "message": "Lead Member with Id 550e8400-e29b-41d4-a716-446655440000 not found"
}
```

---

### 5.5. Deletar Membro do Lead
**Endpoint:** `DELETE /api/leadmember/{id}`  
**Autenticação:** Requerida

**Parâmetros:**
- `id` (Guid) - ID do membro

**Resposta de Sucesso (200):**
```json
{
  "success": true,
  "data": {
    "success": true
  }
}
```

**Resposta de Erro (404):**
```json
{
  "success": false,
  "message": "Lead Member with Id 550e8400-e29b-41d4-a716-446655440000 not found"
}
```

---

## 6. Usuários da Empresa (CompanyUser)

### 6.1. Listar Usuários da Empresa
**Endpoint:** `GET /api/companyuser/company/{companyId}`  
**Autenticação:** Requerida

**Parâmetros:**
- `companyId` (Guid) - ID da empresa

**Resposta de Sucesso (200):**
```json
{
  "success": true,
  "data": [
    {
      "id": "550e8400-e29b-41d4-a716-446655440000",
      "companyId": "660e8400-e29b-41d4-a716-446655440000",
      "userId": "770e8400-e29b-41d4-a716-446655440000",
      "created": "2024-12-29T19:00:00Z",
      "updated": "2024-12-29T19:00:00Z",
      "deleted": null
    }
  ]
}
```

**Resposta de Erro (401):**
```json
{
  "success": false,
  "message": "Unauthorized"
}
```

---

### 6.2. Buscar Usuário da Empresa por ID
**Endpoint:** `GET /api/companyuser/{id}`  
**Autenticação:** Requerida

**Parâmetros:**
- `id` (Guid) - ID da associação

**Resposta de Sucesso (200):**
```json
{
  "success": true,
  "data": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "companyId": "660e8400-e29b-41d4-a716-446655440000",
    "userId": "770e8400-e29b-41d4-a716-446655440000",
    "created": "2024-12-29T19:00:00Z",
    "updated": "2024-12-29T19:00:00Z",
    "deleted": null
  }
}
```

**Resposta de Erro (404):**
```json
{
  "success": false,
  "message": "Company User not found"
}
```

---

### 6.3. Associar Usuário à Empresa
**Endpoint:** `POST /api/companyuser`  
**Autenticação:** Requerida

**Payload:**
```json
{
  "companyId": "660e8400-e29b-41d4-a716-446655440000",
  "userId": "770e8400-e29b-41d4-a716-446655440000"
}
```

**Resposta de Sucesso (201):**
```json
{
  "success": true,
  "data": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "companyId": "660e8400-e29b-41d4-a716-446655440000",
    "userId": "770e8400-e29b-41d4-a716-446655440000",
    "created": "2024-12-29T19:00:00Z",
    "updated": "2024-12-29T19:00:00Z",
    "deleted": null
  }
}
```

**Resposta de Erro (400):**
```json
{
  "success": false,
  "message": "User is already associated with this company"
}
```

---

### 6.4. Remover Associação Usuário-Empresa
**Endpoint:** `DELETE /api/companyuser/{id}`  
**Autenticação:** Requerida

**Parâmetros:**
- `id` (Guid) - ID da associação

**Resposta de Sucesso (200):**
```json
{
  "success": true,
  "data": {
    "success": true
  }
}
```

**Resposta de Erro (404):**
```json
{
  "success": false,
  "message": "Company User with Id 550e8400-e29b-41d4-a716-446655440000 not found"
}
```

---

## 7. Templates de Documentos (CompanyPositionDocumentTemplate)

### 7.1. Listar Templates de Documentos por Posição
**Endpoint:** `GET /api/companypositiondocumenttemplate/company-position/{companyPositionId}`  
**Autenticação:** Requerida

**Parâmetros:**
- `companyPositionId` (Guid) - ID da posição da empresa

**Resposta de Sucesso (200):**
```json
{
  "success": true,
  "data": [
    {
      "id": "550e8400-e29b-41d4-a716-446655440000",
      "companyPositionId": "660e8400-e29b-41d4-a716-446655440000",
      "name": "Passaporte",
      "documentType": "PASSPORT",
      "isRequired": true,
      "targetType": 0,
      "created": "2024-12-29T19:00:00Z",
      "updated": "2024-12-29T19:00:00Z",
      "deleted": null
    },
    {
      "id": "770e8400-e29b-41d4-a716-446655440000",
      "companyPositionId": "660e8400-e29b-41d4-a716-446655440000",
      "name": "Visto",
      "documentType": "VISA",
      "isRequired": true,
      "targetType": 1,
      "created": "2024-12-29T19:00:00Z",
      "updated": "2024-12-29T19:00:00Z",
      "deleted": null
    }
  ]
}
```

**Nota:** `targetType`: 0 = LEAD, 1 = LEAD_MEMBER

**Resposta de Erro (401):**
```json
{
  "success": false,
  "message": "Unauthorized"
}
```

---

### 7.2. Buscar Template por ID
**Endpoint:** `GET /api/companypositiondocumenttemplate/{id}`  
**Autenticação:** Requerida

**Parâmetros:**
- `id` (Guid) - ID do template

**Resposta de Sucesso (200):**
```json
{
  "success": true,
  "data": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "companyPositionId": "660e8400-e29b-41d4-a716-446655440000",
    "name": "Passaporte",
    "documentType": "PASSPORT",
    "isRequired": true,
    "targetType": 0,
    "created": "2024-12-29T19:00:00Z",
    "updated": "2024-12-29T19:00:00Z",
    "deleted": null
  }
}
```

**Resposta de Erro (404):**
```json
{
  "success": false,
  "message": "Document Template not found"
}
```

---

### 7.3. Criar Template de Documento
**Endpoint:** `POST /api/companypositiondocumenttemplate`  
**Autenticação:** Requerida

**Payload:**
```json
{
  "companyPositionId": "660e8400-e29b-41d4-a716-446655440000",
  "name": "Passaporte",
  "documentType": "PASSPORT",
  "isRequired": true,
  "targetType": 0
}
```

**Nota:** `targetType`: 0 = LEAD, 1 = LEAD_MEMBER

**Resposta de Sucesso (201):**
```json
{
  "success": true,
  "data": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "companyPositionId": "660e8400-e29b-41d4-a716-446655440000",
    "name": "Passaporte",
    "documentType": "PASSPORT",
    "isRequired": true,
    "targetType": 0,
    "created": "2024-12-29T19:00:00Z",
    "updated": "2024-12-29T19:00:00Z",
    "deleted": null
  }
}
```

**Resposta de Erro (400):**
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "property": "Name",
      "message": "Nome é obrigatório"
    }
  ]
}
```

---

### 7.4. Atualizar Template de Documento
**Endpoint:** `PUT /api/companypositiondocumenttemplate/{id}`  
**Autenticação:** Requerida

**Parâmetros:**
- `id` (Guid) - ID do template

**Payload:**
```json
{
  "name": "Passaporte Atualizado",
  "documentType": "PASSPORT",
  "isRequired": false,
  "targetType": 0
}
```

**Resposta de Sucesso (200):**
```json
{
  "success": true,
  "data": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "companyPositionId": "660e8400-e29b-41d4-a716-446655440000",
    "name": "Passaporte Atualizado",
    "documentType": "PASSPORT",
    "isRequired": false,
    "targetType": 0,
    "created": "2024-12-29T19:00:00Z",
    "updated": "2024-12-29T20:00:00Z",
    "deleted": null
  }
}
```

**Resposta de Erro (404):**
```json
{
  "success": false,
  "message": "Document Template with Id 550e8400-e29b-41d4-a716-446655440000 not found"
}
```

---

### 7.5. Deletar Template de Documento
**Endpoint:** `DELETE /api/companypositiondocumenttemplate/{id}`  
**Autenticação:** Requerida

**Parâmetros:**
- `id` (Guid) - ID do template

**Resposta de Sucesso (200):**
```json
{
  "success": true,
  "data": {
    "success": true
  }
}
```

**Resposta de Erro (404):**
```json
{
  "success": false,
  "message": "Document Template with Id 550e8400-e29b-41d4-a716-446655440000 not found"
}
```

---

## Códigos de Status HTTP

- **200 OK** - Requisição bem-sucedida
- **201 Created** - Recurso criado com sucesso
- **400 Bad Request** - Erro de validação ou requisição inválida
- **401 Unauthorized** - Token ausente ou inválido
- **404 Not Found** - Recurso não encontrado
- **429 Too Many Requests** - Limite de requisições excedido
- **500 Internal Server Error** - Erro interno do servidor

---

## Observações Importantes

1. **Autenticação:** Todos os endpoints (exceto `/api/auth/*`) requerem o token JWT no header `Authorization`.

2. **Soft Delete:** As operações de delete são "soft delete", ou seja, o registro não é removido fisicamente, apenas marcado como deletado.

3. **TargetType:** No contexto de templates de documentos:
   - `0` = LEAD (documento para o Lead/família)
   - `1` = LEAD_MEMBER (documento para um membro específico do Lead)

4. **Formato de Data:** Todas as datas são retornadas no formato ISO 8601 (UTC).

5. **Rate Limiting:** A API possui rate limiting configurado:
   - Login: 5 tentativas por minuto
   - Cadastro: 3 tentativas por hora
   - Outros endpoints: 100 requisições por minuto

