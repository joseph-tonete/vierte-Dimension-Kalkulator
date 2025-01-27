Seja bem vindo ao meu projeto! Meu nome é Joseph Tonete Knoener e eu vou te guiar por todo esse programa!

SOBRE O PROGRAMA:
  Essa é uma calculadora que calcula e representa a quarta dimensão de uma função de até 3 variáveis por meio de cores. Ela é fruto de aulas de cálculo bem pouco estressantes. Uma função de uma variável gera gráficos do tipo parabola já por nós conhecidos, onde se entra um valor x e se recebe um y. Com duas variáveis já é possível gerar planos e superfícies, entrando com valores de x e y e recebendo um z. Mas a partir do momento em que se usam 3 variáveis não é mais possível desenhar o que é agora um sólido (por mais que se possa desenhar 'camadas' restringindo uma de suas variáveis). A minha ideia foi mapear cada um dos valores obtidos em um ponto do R3 em uma cor específica, podendo assim assimilar o valor de cada um dos pontos! Talvez fique mais claro tentando na prática ;P .

SOBRE OS ARQUIVOS:
  Na raiz do projeto se encontram todas as versões já criadas do programa, um controle de versão detalhado, alguns prints tirados do programa e este README.md. A versão final atualmente é a encontrada na pasta 'v 0.1.5'. As versões anteriores ou nem funcionam ou apresentam falhas. Para esse projeto foi-se usada a biblioteca 'three.js', que pode ser encontrada parcialmente dentro das pastas dos arquivos.

SOBRE COMO USAR:
  Se a tentativa de hospedar esse site no Github deu certo, você pode acessa-lo diretamente pelo navegador na página do projeto ou diretamente por esse link: https://joseph-tonete.github.io/vierte-Dimension-Kalkulator/ ! Mas se isso não deu certo ou você pensou bem e agora deseja guarda-lo com carinho, é só baixar a pasta da última versão do projeto ('v 0.1.5'). Vale lembrar que é ele só funciona em servidores ou em simulações de um, como o live-server disponível no VSCode. 
  
  Com a calculadora ja aberta eu posso lhe explicar o que cada campo faz. 
  #Função: 
      Aqui você pode inserir qualquer função usando x, y e/ou z e operadores matemáticos (' x+y-z ').
  #Resolução:
      Aqui você pode selecionar quantos cubos haverão em cada lado. 20 é bom, mas quantos mais melhor fica o gráfico, porém haja computação.
  #Escala: 
      O gráfico é gerado por padrão do -10 até o 10 em todas as dimensões. Se quiser ver o grafico 'mais de longe',         aumente a escala!
  #Restrições:
      As restrições permitem restringir o que será calculado e mostrado. Restringir 0 < X < 8 irá restringir o gráfico no x entre 0 e 8. Restringir -4 < Y 40 ou -9 < Z < -3 fará a mesma coisa mas em dimensões diferentes. Agora 0 < A < - ira restringir os resultados de cada bloco gerado, mostrando somente o que estiver dentro da restrição.

OPERADORES:
  Os operadores básicos da calculadora são o '+', '-', '/' e '*'.
  Operador de exponenciação e raiz é o '^' e o 'sqrt()' ou '^0.5'.
  Também são aceitos as funções de 'sin(), cos(), tan()'.
  A função absolute deixa qualquer valor de dentro dela positivo: 'abs()'.

  Para você que já está com o programa funcionando, aqui estão algumas equações que dão um resultado legal!

  x + y + z 
  x + y + z Restrição: - < A < 0
  cos(x + y +z)
  cos(x) + cos(y) + cos(z) Restrição: 0 < A < - ou - < A < 0
  (x^2 + y^2 + z^2)^0.5 Restição: 0 < X < - e - < A < 10
  (x^2 + y^2)^0.5 Restição: 0 < X < - e - < A < 10
  
  
  

  
