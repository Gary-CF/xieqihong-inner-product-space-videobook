"""Exact/rational and numeric spot checks supporting (not replacing) the proof review."""
from pathlib import Path
from fractions import Fraction as F
import json,math
O=Path(__file__).resolve().parents[1]
results=[]
def matrix(a):return [[F(x) for x in row] for row in a]
def T(a):return list(map(list,zip(*a)))
def mm(a,b):return [[sum(x*y for x,y in zip(row,col)) for col in zip(*b)] for row in a]
def add(a,b):return [[x+y for x,y in zip(r,s)] for r,s in zip(a,b)]
def sub(a,b):return add(a,[[-x for x in r] for r in b])
def dot(a,b):return sum(x*y for x,y in zip(a,b))
def eye(n):return matrix([[int(i==j) for j in range(n)] for i in range(n)])
def ck(label,ok):
 assert ok,label
 results.append({'check':label,'passed':True})
# P100 original example: orthogonalization before normalization.
us=[list(map(F,x)) for x in [(3,0,4),(-1,0,7),(2,9,11)]]
vs=[]
for u in us:
 v=u[:]
 for old in vs:
  factor=dot(u,old)/dot(old,old);v=[x-factor*y for x,y in zip(v,old)]
 vs.append(v)
ck('9.2 original Schmidt residuals',vs==[list(map(F,x)) for x in [(3,0,4),(-4,0,3),(0,9,0)]])
ck('9.2 pairwise orthogonality',all(dot(vs[i],vs[j])==0 for i in range(3) for j in range(i)))
# P106 actual examples and detected sign correction.
a=matrix([[4,2,2],[2,4,2],[2,2,4]])
vectors=[matrix([[1],[1],[1]]),matrix([[-1],[1],[0]]),matrix([[-1],[-1],[2]])]
ck('9.5 example 1 spectrum 8,2,2',all(mm(a,v)==[[lam*x[0]] for x in v] for v,lam in zip(vectors,[8,2,2])))
b=matrix([[2,-1,-1],[-1,2,-1],[-1,-1,2]])
ck('9.5 corrected reconstruction 0,3,3',all(mm(b,v)==[[lam*x[0]] for x in v] for v,lam in zip(vectors,[0,3,3])))
ck('9.5 corrected matrix equals 3I-J',sum(b[i][i] for i in range(3))==6 and mm(b,b)==[[3*x for x in r] for r in b])
# Normal versus diagonalizable; C(a,b) real normal block.
a=matrix([[1,1],[0,2]])
ck('9.6 triangular nonnormal countercheck',mm(a,T(a))!=mm(T(a),a))
c=matrix([[3,4],[-4,3]])
ck('9.7 C(a,b) normal and rho squared 25',mm(c,T(c))==mm(T(c),c)==matrix([[25,0],[0,25]]))
d=sub(c,matrix([[3,0],[0,3]]))
ck('9.7 quadratic minimal polynomial relation',add(mm(d,d),matrix([[16,0],[0,16]]))==matrix([[0,0],[0,0]]))
h=matrix([[1,0],[0,0]]);u1=eye(2);u2=matrix([[1,0],[0,-1]])
ck('9.8 singular polar orthogonal factor is not unique',mm(u1,h)==mm(u2,h)==h and u1!=u2)
e1=matrix([[F(1,2),F(1,2)],[F(1,2),F(1,2)]])
e2=sub(eye(2),e1)
ck('9.8 projection idempotence and orthogonality',mm(e1,e1)==e1 and mm(e1,e2)==matrix([[0,0],[0,0]]) and add(e1,e2)==eye(2))
# Rectangular SVD, use floating entries only at normalized vectors.
s=math.sqrt(2)
p=[[1/s,1/s,0],[1/s,-1/s,0],[0,0,1]]
q=[[1/s,1/s],[1/s,-1/s]]
sigma=[[2,0],[0,0],[0,0]]
a=matrix([[1,1],[1,1],[0,0]])
approx=mm(mm(p,sigma),T(q))
ck('9.9 rectangular SVD 3 by 2 with zero direction',max(abs(approx[i][j]-a[i][j]) for i in range(3) for j in range(2))<1e-12)
plus=matrix([[F(1,4),F(1,4),0],[F(1,4),F(1,4),0]])
ck('9.10 four Moore-Penrose conditions',mm(mm(a,plus),a)==a and mm(mm(plus,a),plus)==plus and mm(a,plus)==T(mm(a,plus)) and mm(plus,a)==T(mm(plus,a)))
beta=matrix([[1],[3],[4]]);z=mm(plus,beta);res=sub(beta,mm(a,z))
ck('9.10 rank deficient least squares z=(1,1)',z==matrix([[1],[1]]) and mm(T(a),res)==matrix([[0],[0]]))
ck('9.10 squared minimum residual 18',sum(x[0]**2 for x in res)==18)
for t in [-3,-1,0,2,5]:
 x=add(z,matrix([[t],[-t]]))
 ck(f'9.10 nullspace family t={t}',mm(a,x)==mm(a,z) and sum(v[0]**2 for v in x)==2+2*t*t)
(O/'editorial/math-computation-result.json').write_text(json.dumps({'passed':True,'checks':results,'note':'Numerical and exact spot checks; analytic proofs reviewed separately in math-checklist.md.'},ensure_ascii=False,indent=2))
print('Mathematical spot checks passed:',len(results))
